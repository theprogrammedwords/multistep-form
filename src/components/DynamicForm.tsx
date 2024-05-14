import { FormField } from '../configs/formdata';
import { useEffect, useState } from 'react';
import { dataTypes } from '../configs/formdata';
import { checkValues, getValueByKey } from '../utils/validationUtils';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const loanData: loanData[] = JSON.parse(localStorage.getItem('loanData') as string) as loanData[];
  const [formLoanData, setFormLoanData] = useState<loanData[]>(loanData);
  let activeConfigData = data[activeIndex]?.fields;
  activeConfigData = activeConfigData?.map((item, index) => {
    return {
      ...item,
      isFilled: false,
      value: null
    };
  });
  const [formData, setFormData] = useState(activeConfigData);

  const isSaveDisabled = (): boolean => {
    const currentData: FormField | undefined = data[activeIndex];
    if (!currentData || !currentData.fields) {
      return true;
    }

    const result: boolean = currentData.fields.some((item, index) => item.mandatory && !formData?.[index]?.isFilled);
    return result;
  };


  const handleSave = () => {
    const formDataForStorage: loanData[] = loanData ? loanData : [];

    formData?.forEach((item, index) => {
        const localData: loanData = {
            sectionName: data[activeIndex].key,
            id: item.key,
            value: item.value
        };

        const existingIndex = formDataForStorage.findIndex(
            (dataItem) => dataItem.sectionName === localData.sectionName && dataItem.id === localData.id
        );

        if (existingIndex !== -1) {
            formDataForStorage[existingIndex] = localData;
        } else {
            formDataForStorage.push(localData);
        }
    });

    const errors: any = [];
    data?.forEach((section) => {
        const sectionFields = formDataForStorage?.filter((field) => field.sectionName === section.key);
        errors.push(...checkValues(section?.fields as unknown as any, sectionFields));
    });

    setActiveIndex(activeIndex < data.length - 1 ? activeIndex + 1 : data.length - 1);
    localStorage.setItem('loanData', JSON.stringify(formDataForStorage));
};


  const isNavigationDisabled = (type: string): boolean => {
    if (type === 'prev') {
      return activeIndex === 0 ? true : false;
    } else if (type === 'next') {
      return activeIndex === data.length - 1 ? true : false;
    }
    return false;
  };

  const handleFieldChange = (index: number , item : FormField, value : string)=> {
    const updatedFormData = formData?.map((field, i) => {
        if (i === index) {
          return {
            ...field,
            value : value,
            isFilled: value.trim().length > 0
          };
        }
        return field;
      });
      setFormData(updatedFormData);
  }

  

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
                          <input value={getValueByKey(item.key, loanData) as unknown as string} onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></input>
                        </FieldLabel>
                      ) : item.type === dataTypes.TEXTAREA ? (
                        <FieldLabel>
                          <textarea value={getValueByKey(item.key, loanData) as unknown as string} onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></textarea>
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
                Save
              </button>
            )}
            {(
              <button className="reset">
                Reset
              </button>
            )}
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

