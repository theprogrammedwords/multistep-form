import { FormField } from '../configs/formdata';

export const validationFunctions = {
  isRequired: (value: string | null | undefined) =>
    value !== undefined && value !== null && value !== '',
  maxLength: (value: string | any[], maxLength: number) => value.length <= maxLength,
  minLength: (value: string | any[], minLength: number) => value.length >= minLength,
  regex: (value: string, pattern: string | RegExp) => new RegExp(pattern).test(value)
};

type Validation = (value: any) => boolean | string;
interface Field {
  id: string;
  key: string;
  constraints?: {
    validations?: Validation[];
  };
}
interface FormData {
  id: string;
  value: any;
}
interface Error {
  id: string;
  error: string;
}

export const checkValues = (fields: Field[], formData: FormData[]): Error[] => {
  const errors: Error[] = [];

  fields?.forEach((field: Field) => {
    const formField = formData?.find((f) => f.id === field.key);
    if (formField) {
      field?.constraints?.validations?.forEach((validation) => {
        const validationResult = validation(formField?.value);
        if (validationResult !== true) {
          errors.push({
            id: formField.id,
            error: validationResult as string
          });
        }
      });
    }
  });

  return errors;
};
