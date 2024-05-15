import { FormField } from '../configs/formdata';
import { useEffect, useState } from 'react';
import { dataTypes } from '../configs/formdata';
import { checkValues, debounce, getValueByKey } from '../utils/validationUtils';
import { DynamicFormWrapper, FieldLabel, FieldWrapper, FormTitle, ButtonWrapper } from './DynamicFormStyles';

interface DynamicFormProps {
  data: FormField[];
}

export interface loanData {
    sectionName : string,
    id : string,
    value : string
}


export const DynamicForm = ({ data }: DynamicFormProps) => {
  const lastModifiedIndex : number = JSON.parse(localStorage.getItem('lastModifiedIndex') as unknown as any)
  const loanData: loanData = JSON.parse(localStorage.getItem('loanData') as unknown as any);
  const [activeIndex, setActiveIndex] = useState<number>(lastModifiedIndex ? lastModifiedIndex : -1);
  const isLastStep = activeIndex === data.length -1;
  const [formLoanData, setFormLoanData] = useState<loanData[]>(loanData ? loanData as unknown as any : []);
  let activeConfigData = data[activeIndex]?.fields;
  activeConfigData = activeConfigData?.map((item, index) => {
    return {
      ...item,
      isFilled: false,
      value: null,
    };
  });
  const [formData, setFormData] = useState(activeConfigData);


  const isSaveDisabled = (): boolean => {
    const currentData: FormField | undefined = data[activeIndex];
    if (!currentData || !currentData.fields) {
      return true;
    }

   
    const result: boolean = currentData.fields.some((item, index) => {
        const fieldData = formLoanData.filter((fielditem)=> {
            return item.key === fielditem.id
        })

       return item.mandatory && (!formData?.[index]?.isFilled && !fieldData[0]?.value)
    });
    return result;
  };


  const handleSave = () => {
    const errors: any = [];
    data?.forEach((section) => {
        const sectionFields = formLoanData?.filter((field) => field.sectionName === section.key);
        errors.push(...checkValues(section?.fields as unknown as any, sectionFields));
    });
    const newActiveIndex = activeIndex < data.length - 1 ? activeIndex + 1 : data.length - 1;
    
    setActiveIndex(newActiveIndex);

    localStorage.setItem('loanData', JSON.stringify(formLoanData));
    localStorage.setItem('lastModifiedIndex', JSON.stringify(newActiveIndex))
};

const handleFieldChange = (index: number, item: FormField, value: string) => {
    const updatedFormData = formData?.map((field, i) => {
      if (i === index) {
        return {
          ...field,
          value: value,
          isFilled: value.trim().length > 0
        };
      }
      return field;
    });

    const updatedFormLoanData: loanData[] = [...formLoanData];
    const localData = {
      sectionName: data[activeIndex].key,
      id: item.key,
      value: value
    };

    const existingIndex = updatedFormLoanData.findIndex(
      (dataItem) => dataItem.sectionName === localData.sectionName && dataItem.id === localData.id
    );

    if (existingIndex !== -1) {
      updatedFormLoanData[existingIndex] = localData;
    } else {
      updatedFormLoanData.push(localData);
    }

    setFormData(updatedFormData);
    setFormLoanData(updatedFormLoanData as unknown as []);
  };

  const isNavigationDisabled = (type: string): boolean => {
    if (type === 'prev') {
      return activeIndex === 0 ? true : false;
    } else if (type === 'next') {
      return activeIndex === data.length - 1 ? true : false;
    }
    return false;
  };

  

  useEffect(() => {
    if (activeIndex !== -1) {
      let activeConfigData = data[activeIndex]?.fields || [];
      activeConfigData = activeConfigData.map((item, index) => {
        return {
          ...item,
          isFilled: false,
          value: null
        };
      });
      setFormData(activeConfigData);
    }
  }, [activeIndex, data]);


  return (
    <DynamicFormWrapper>
      {Object.entries(data).map(
        ([metakey, sectionData], index) =>
          Number(activeIndex) === index && (
            <div key={metakey}>
              <FormTitle>{sectionData.label}</FormTitle>
              <div>
                {sectionData.fields?.map((item, index) => {
                  return (
                    <FieldWrapper key={index}>
                      <FieldLabel>
                        {item.order}. {item.label}
                        <span style={{ color: item.mandatory ? 'red' : 'gray' }}>
                          {item.mandatory ? ' *' : '(Optional)'}
                        </span>
                      </FieldLabel> 
                      {item.type === dataTypes.TEXTFIELD ? (
                        <FieldLabel>
                          <input value={getValueByKey(item.key, formLoanData) as unknown as string} onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></input>
                        </FieldLabel>
                      ) : item.type === dataTypes.TEXTAREA ? (
                        <FieldLabel>
                          <textarea value={getValueByKey(item.key, formLoanData) as unknown as string} onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></textarea>
                        </FieldLabel>
                      ) : null}
                    </FieldWrapper>
                  );
                })}
              </div>
            </div>
          )
      )}

      {(Number(activeIndex) < 0 || Number(activeIndex) >= data.length) && (
        <FormTitle className="message">
          Please complete the form for quick processing and disbursement of your loan
        </FormTitle>
      )}

      <ButtonWrapper>
        {activeIndex >= 0 && activeIndex < data.length ? (
          <>
            {' '}
            {(
              <button
                disabled={isNavigationDisabled('prev')}
                className="navigation"
                onClick={() => setActiveIndex(activeIndex - 1)}>
                {'<'}
              </button>
            )}
            {(
              <button disabled={isSaveDisabled()} onClick={()=> handleSave()} className="save">
                {isLastStep ? 'Submit' : 'Save'}
              </button>
            )}
            {/* {(
              <button className="reset" onClick={()=> handleReset()}>
                Reset
              </button>
            )} */}
            {(
              <button
                disabled={isNavigationDisabled('next')}
                className="navigation"
                onClick={() => setActiveIndex(activeIndex + 1)}>
                {'>'}
              </button>
            )}{' '}
          </>
        ) : (
          <button className="save" onClick={() => {
                setActiveIndex(0);
                localStorage.clear();
            }
          }>
            {activeIndex < 0 ? 'Start' : 'Go back'}
          </button>
        )}
      </ButtonWrapper>
    </DynamicFormWrapper>
  );
};

