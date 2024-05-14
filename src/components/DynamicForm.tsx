import { FormField, SectionData } from '../configs/formdata';
import { act, useState } from 'react';
import styled from 'styled-components';
import { dataTypes } from '../configs/formdata';

interface DynamicFormProps {
  data: FormField[];
}

export const DynamicForm = ({ data }: DynamicFormProps) => {
  
  const [activeIndex, setActiveIndex] = useState(-1);
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
                          <input placeholder={item.placeholder}></input>
                        </FieldLabel>
                      ) : item.type === dataTypes.TEXTAREA ? (
                        <FieldLabel>
                          <textarea placeholder={item.placeholder}></textarea>
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
              <button disabled={isSaveDisabled()} className="save">
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
  }

  textarea {
    height: 60px;
    font-family: ${(props) => props.theme.fonts[0]};
  }
`;
