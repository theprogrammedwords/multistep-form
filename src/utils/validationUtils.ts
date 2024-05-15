import { loanData } from '../components/DynamicForm';
import { Field as FormField } from '../configs/formdata';

export const validationFunctions = {
  isRequired: (value: string | null | undefined) =>
    value !== undefined && value !== null && value !== '',
  maxLength: (value: string | any[], maxLength: number) => value.length <= maxLength,
  minLength: (value: string | any[], minLength: number) => value.length >= minLength,
  regexTest: (value: string, pattern: string | RegExp) => new RegExp(pattern).test(value)
};

type Validation = (value: any) => boolean | string;
interface Field {
  message: string;
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
  isValid: boolean;
  message: string;
}

export const checkValues = (fields: Field[], formData: FormData[]): Error[] => {
  const errors: Error[] = [];

  fields?.forEach((field: Field, index: number) => {
    const formField = formData?.find((f) => f.id === field.key);
    if (formField) {
      field?.constraints?.validations?.forEach((validation) => {
        const validationResult = validation(formField?.value);
        if (validationResult !== true) {
          errors.push({
            id: formField.id,
            isValid: validationResult as boolean,
            message: field?.message
          });
        }
      });
    }
  });

  return errors;
};

export const getValueByKey = (key: string, data: loanData[]): string => {
  const val: loanData[] =
    data &&
    data?.filter((item, index) => {
      if (item.id === key) {
        return item.value;
      } else return '';
    });

  return val?.[0]?.value;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function readableKeyString(str: string) {
  const result = str.split('_');
  let data = '';
  result.map((item, index) => {
    data += toTitleCase(item) + ' ';
  });

  return data;
}

export const generateLoanId = () => {
  const prefix = 'LAN';
  const digits = '0123456789';
  const digitsLength = digits.length;
  let loanId = prefix;

  for (let i = 0; i < 7; i++) {
    loanId += digits.charAt(Math.floor(Math.random() * digitsLength));
  }

  return loanId;
};

export const validateField = (field: FormField, value: string) => {
  const { validations } = field?.constraints as unknown as any;
  for (let i = 0; i < validations.length; i++) {
    if (!validations[i](value)) {
      return false;
    }
  }
  return true;
};
