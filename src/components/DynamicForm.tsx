import { FormField, SectionData } from '../configs/formdata';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dataTypes } from '../configs/formdata';
import { checkValues } from '../utils/validationUtils';

interface DynamicFormProps {
  data: FormField[];
}

interface loanData {
    sectionName : string,
    id : string,
    value : string
}


export const DynamicForm = ({ data }: DynamicFormProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const loanData: loanData[] = JSON.parse(localStorage.getItem('loanData') as string) as loanData[];
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

  const handleSave = ()=> {
    const formDataForStorage: loanData[] = loanData ? loanData : [];

    formData?.map((item, index)=> {
        const localData : loanData= {
            sectionName : data[activeIndex].key,
            id : item.key,
            value : item.value
        }
        formDataForStorage?.push(localData)
    }) 

    const errors : any = [];
    data?.forEach(section => {
        const sectionFields = loanData?.filter(field => field.sectionName === section.key);
        errors.push(...checkValues(section?.fields as unknown as any, sectionFields));
    });

    console.log(errors)
    localStorage.setItem('loanData', JSON.stringify(formDataForStorage))
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
                          <input onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></input>
                        </FieldLabel>
                      ) : item.type === dataTypes.TEXTAREA ? (
                        <FieldLabel>
                          <textarea onChange={(e)=> handleFieldChange(index, item, e.target.value)} placeholder={item.placeholder}></textarea>
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
          <button className="save" onClick={() => setActiveIndex(0)}>
            {activeIndex < 0 ? 'Start' : 'Go back'}
          </button>
        )}
      </ButtonWrapper>
    </DynamicFormWrapper>
  );
};

const DynamicFormWrapper = styled.div`
  background-color: white;
  margin: 20px;
  padding: 12px;
  border-radius: 8px;
  padding-bottom: 40px;
  font-family: ${(props) => props.theme.fonts[0]};

  @media (max-width: 768px) {
    padding-bottom: 40px;
    margin: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  button {
    border: 0px;
    margin: 4px;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 8px;
    @media (max-width: 768px) {
      padding: 8px 16px;
    }
  }

  button:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .save {
    color: ${({ theme: { colors } }) => colors.tertiary};
    background-color: ${({ theme: { colors } }) => colors.primary};
  }
  .save:hover {
    color: ${({ theme: { colors } }) => colors.primary};
    background-color: ${({ theme: { colors } }) => colors.tertiary};
  }
  .reset {
    color: ${({ theme: { colors } }) => colors.primary};
    background-color: ${({ theme: { colors } }) => colors.quaternary};
  }
  .reset:hover,
  .navigation:hover {
    color: ${({ theme: { colors } }) => colors.tertiary};
    background-color: ${({ theme: { colors } }) => colors.primary};
  }

  .navigation {
    color: ${({ theme: { colors } }) => colors.primary};
    background-color: ${({ theme: { colors } }) => colors.tertiary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.large};
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const FormTitle = styled.div`
  color: ${({ theme: { colors } }) => colors.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.large};
  margin: 20px;

  .message {
    margin: 40px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
    margin: 10px;
  }
`;

const FieldLabel = styled.div`
  color: ${({ theme: { colors } }) => colors.primary};
  margin: 4px 28px;
  text-align: left;

  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  }

  @media (max-width: 768px) {
    margin: 4px 14px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  margin: 20px 28px;
  color: ${({ theme: { colors } }) => colors.primary};
  text-align: left;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 10px 14px;
  }

  input,
  textarea {
    color: ${({ theme: { colors } }) => colors.primary};
    border: 1px solid ${({ theme: { colors } }) => colors.primary};
    padding: 4px;
    width: calc(100% / 3);

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  input {
    height: 24px;
    font-family: ${(props) => props.theme.fonts[0]};
    padding: 10px 20px;
  }

  textarea:focus, input:focus {
    background-color: ${({ theme: { colors } }) => colors.tertiary};
    outline-color: ${({ theme: { colors } }) => colors.primary};
  }

  textarea {
    height: 60px;
    padding: 30px 0 0 20px;
    font-family: ${(props) => props.theme.fonts[0]};
  }
`;
