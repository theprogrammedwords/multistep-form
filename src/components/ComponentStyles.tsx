import styled from 'styled-components';
export const DynamicFormWrapper = styled.div`
  background-color: white;
  margin: 20px;
  padding: 12px;
  border-radius: 8px;
  padding-bottom: 40px;
  font-family: ${(props) => props.theme.fonts?.[0]};

  .error {
    font-size: ${({ theme: { fontSizes } }) => fontSizes?.extrasmall};
    color: ${({ theme: { colors } }) => colors?.error};
    margin: 0;
  }
  @media (max-width: 768px) {
    padding-bottom: 40px;
    margin: 8px;
  }
`;

export const ButtonWrapper = styled.div`
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
    color: ${({ theme: { colors } }) => colors?.tertiary};
    background-color: ${({ theme: { colors } }) => colors?.primary};
  }
  .save:hover {
    color: ${({ theme: { colors } }) => colors?.primary};
    background-color: ${({ theme: { colors } }) => colors?.tertiary};
  }
  .reset {
    color: ${({ theme: { colors } }) => colors?.primary};
    background-color: ${({ theme: { colors } }) => colors?.quaternary};
  }
  .reset:hover,
  .navigation:hover {
    color: ${({ theme: { colors } }) => colors?.tertiary};
    background-color: ${({ theme: { colors } }) => colors?.primary};
  }

  .navigation {
    color: ${({ theme: { colors } }) => colors?.primary};
    background-color: ${({ theme: { colors } }) => colors?.tertiary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes?.large};
    margin-right: 20px;
    margin-left: 20px;
  }
`;

export const FormTitle = styled.div`
  color: ${({ theme: { colors } }) => colors?.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes?.large};
  margin: 20px;

  .message {
    margin: 40px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes?.medium};
    margin: 10px;
  }
`;

export const FieldLabel = styled.div`
  color: ${({ theme: { colors } }) => colors?.primary};
  margin: 4px 28px;
  text-align: left;

  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  }

  @media (max-width: 768px) {
    margin: 4px 14px;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  margin: 20px 28px;
  color: ${({ theme: { colors } }) => colors?.primary};
  text-align: left;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 10px 14px;
  }

  input,
  textarea {
    color: ${({ theme: { colors } }) => colors?.primary};
    border: 1px solid ${({ theme: { colors } }) => colors?.primary};
    padding: 4px;
    width: calc(100% / 3);

    @media (max-width: 768px) {
      width: 90%;
    }
  }

  input {
    height: 24px;
    font-family: ${(props) => props.theme.fonts?.[0]};
    padding: 10px 20px;
  }

  textarea:focus,
  input:focus {
    background-color: ${({ theme: { colors } }) => colors?.tertiary};
    outline-color: ${({ theme: { colors } }) => colors?.primary};
  }

  textarea {
    height: 60px;
    padding: 30px 0 0 20px;
    font-family: ${(props) => props.theme.fonts?.[0]};
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  color: ${({ theme: { colors } }) => colors?.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  text-align: left;
  flex-direction: column;

  .field-value {
    display: flex;
    margin: 2px;

    div {
      margin: 4px;
      padding: 2px;
    }
  }

  @media (max-width: 768px) {
    margin: 10px 14px;
  }
`;
