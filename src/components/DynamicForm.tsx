import { Field, FormField } from '../configs/formdata';
import { useEffect, useState } from 'react';
import { dataTypes } from '../configs/formdata';
import {
  checkValues,
  generateLoanId,
  getValueByKey,
  readableKeyString,
  toTitleCase
} from '../utils/appUtils';
import {
  DynamicFormWrapper,
  FieldLabel,
  FieldWrapper,
  FormTitle,
  ButtonWrapper,
  PreviewWrapper
} from './ComponentStyles';
import { Section } from './Section';

interface DynamicFormProps {
  data: FormField[];
  id: string;
}

export interface loanData {
  sectionName: string;
  id: string;
  value: string;
}

interface Error {
  id: string;
  isValid: boolean;
  message: string;
}

interface Sections {
  [key: string]: loanData[];
}

export const DynamicForm = ({ data, id }: DynamicFormProps) => {
  const lastModifiedIndex: number = JSON.parse(
    localStorage.getItem('lastModifiedIndex') as unknown as any
  );
  const LAN = JSON.parse(localStorage.getItem('LAN') as string);
  const loanData: loanData = JSON.parse(localStorage.getItem('loanData') as unknown as any);

  const [activeIndex, setActiveIndex] = useState<number>(
    lastModifiedIndex ? lastModifiedIndex : -1
  );
  const [showPreview, setShowPreview] = useState<boolean>(LAN ? true : false);
  const isLastStep = activeIndex === data.length - 1;
  const [formLoanData, setFormLoanData] = useState<loanData[]>(
    loanData ? (loanData as unknown as any) : []
  );
  const [error, setError] = useState<Error[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(LAN ? true : false);

  let activeConfigData = data[activeIndex]?.fields;
  activeConfigData = activeConfigData?.map((item, index) => {
    return {
      ...item,
      isFilled: false,
      value: null
    };
  });

  const [formData, setFormData] = useState(activeConfigData);

  const sections: Sections = formLoanData.reduce<Sections>((acc, item) => {
    if (!acc[item.sectionName]) {
      acc[item.sectionName] = [];
    }
    acc[item.sectionName].push(item);
    return acc;
  }, {});

  const isSaveDisabled = (): boolean => {
    const currentData: FormField | undefined = data[activeIndex];
    if (!currentData || !currentData.fields) {
      return true;
    }
    const result: boolean = currentData.fields.some((item, index) => {
      const fieldData = formLoanData.filter((fielditem) => {
        return item.key === fielditem.id;
      });

      return item.mandatory && !formData?.[index]?.isFilled && !fieldData[0]?.value;
    });
    return result;
  };

  const handleSave = () => {
    const newActiveIndex = activeIndex < data.length - 1 ? activeIndex + 1 : data.length - 1;

    setActiveIndex(newActiveIndex);

    localStorage.setItem('loanData', JSON.stringify(formLoanData));
    localStorage.setItem('lastModifiedIndex', JSON.stringify(newActiveIndex));

    if (isLastStep) {
      setShowPreview(true);

      const errors: any = [];
      data?.forEach((section) => {
        const sectionFields = formLoanData?.filter((field) => field.sectionName === section.key);
        errors.push(...checkValues(section?.fields as unknown as any, sectionFields));
      });
      setError(errors);
    }
  };

  const handleFieldChange = (index: number, item: FormField, value: string) => {
    const updatedFormData = formData?.map((field: Field, i) => {
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

  const submitData = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      data: formLoanData
    };

    interface options {
      method: string;
      headers: unknown;
      mode: RequestMode;
      body: loanData[];
    }
    const options = {
      method: 'POST',
      headers,
      mode: 'cors' as RequestMode,
      body: JSON.stringify(body)
    };

    //mock api call - ideally write in service file.
    fetch('https://eopffoflt1xjzf.m.pipedream.net', options).then((res) => {
      setLoading(false);
      alert('Data sent successfully to Pipedream mock server');
    });
  };

  const handleFormSubmit = () => {
    setLoading(true);
    setShowPreview(true);
    setSuccess(true);
    localStorage.setItem('LAN', JSON.stringify(generateLoanId()));
    submitData();
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
      {loading && <>Loading...</>}
      {!showPreview && (
        <>
          {' '}
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
                              <input
                                type={item.valuetype}
                                value={getValueByKey(item.key, formLoanData) as unknown as string}
                                onChange={(e) => handleFieldChange(index, item, e.target.value)}
                                placeholder={item.placeholder}></input>
                            </FieldLabel>
                          ) : item.type === dataTypes.TEXTAREA ? (
                            <FieldLabel>
                              <textarea
                                value={getValueByKey(item.key, formLoanData) as unknown as string}
                                onChange={(e) => handleFieldChange(index, item, e.target.value)}
                                placeholder={item.placeholder}></textarea>
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
                {
                  <button
                    disabled={isNavigationDisabled('prev')}
                    className="navigation"
                    onClick={() => setActiveIndex(activeIndex - 1)}>
                    {'<'}
                  </button>
                }
                {
                  <button disabled={isSaveDisabled()} onClick={() => handleSave()} className="save">
                    {isLastStep ? 'Review' : 'Save'}
                  </button>
                }
                {isLastStep && (
                  <button
                    className="reset"
                    onClick={() => {
                      localStorage.clear();
                      setFormLoanData([]);
                      setActiveIndex(-1);
                    }}>
                    Reset Form
                  </button>
                )}
                {
                  <button
                    disabled={isNavigationDisabled('next')}
                    className="navigation"
                    onClick={() => setActiveIndex(activeIndex + 1)}>
                    {'>'}
                  </button>
                }{' '}
              </>
            ) : (
              <button
                className="save"
                onClick={() => {
                  setActiveIndex(0);
                  localStorage.clear();
                }}>
                {activeIndex < 0 ? 'Start' : 'Go back'}
              </button>
            )}
          </ButtonWrapper>
        </>
      )}
      {showPreview && !loading && (
        <>
          {Object.keys(sections).map((sectionName) => (
            <Section
              error={error}
              key={sectionName}
              title={sectionName}
              items={sections[sectionName]}
            />
          ))}

          {error.length > 0 && (
            <span className="error">*items highlighted in red are invalid, can't be submitted</span>
          )}

          {!success && (
            <ButtonWrapper>
              <button
                disabled={error.length > 0}
                className="save"
                onClick={() => handleFormSubmit()}>
                {'Submit'}
              </button>
              <button
                className="reset"
                onClick={() => {
                  setActiveIndex(data.length - 1);
                  setShowPreview(false);
                }}>
                {'Go Back'}
              </button>
            </ButtonWrapper>
          )}

          {success && (
            <FieldLabel className="success">
              {' '}
              <strong className="success">
                Data submitted successfully !!!
                <div>LAN ID : {JSON.parse(localStorage.getItem('LAN') as string)}</div>
              </strong>
              <ButtonWrapper>
                <button
                  className="save"
                  onClick={() => {
                    localStorage.clear();
                    setActiveIndex(-1);
                    setShowPreview(false);
                    window.location.reload();
                  }}>
                  {'Start another loan application'}
                </button>
              </ButtonWrapper>
            </FieldLabel>
          )}
        </>
      )}
    </DynamicFormWrapper>
  );
};
