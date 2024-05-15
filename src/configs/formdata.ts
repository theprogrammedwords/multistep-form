import { validationFunctions } from '../utils/appUtils';

export type SectionData = {
  key: string;
  label: string;
};

export type DataTypes = 'TEXTAREA' | 'TEXTFIELD' | 'DATE';

type ValidationFunction = (value: string) => boolean;
export interface FormField {
  label: string;
  key: string;
  fields?: Field[];
}

export interface Constraints {
  maxLength?: number;
  minLength?: number;
  allowedSpecialCharacters?: Array<string>;
  regex?: string;
  validations?: ValidationFunction[];
}
export interface Field {
  id?: string | undefined;
  order: number;
  label: string;
  key: string;
  valuetype?: string;
  type: DataTypes;
  section?: string;
  mandatory?: boolean;
  placeholder?: string;
  value?: null | undefined | any;
  isFilled?: boolean;
  constraints?: Constraints;
  message?: string;
}

export const sectionData: { [key: string]: SectionData } = {
  PERSONAL: {
    key: 'PERSONAL',
    label: 'Personal Details'
  },
  BUSINESS: {
    key: 'BUSINESS',
    label: 'Business Details'
  },
  BANK: {
    key: 'BANK',
    label: 'Bank Details'
  },
  REVIEW: {
    key: 'Review',
    label: 'Review Details'
  }
};

export const dataTypes: { [key in DataTypes]: DataTypes } = {
  TEXTAREA: 'TEXTAREA',
  TEXTFIELD: 'TEXTFIELD',
  DATE: 'DATE'
};

export const formData: FormField[] = [
  {
    key: 'PERSONAL',
    label: 'Personal Details',
    fields: [
      {
        order: 1,
        label: 'Name',
        key: sectionData.PERSONAL.key + '_NAME',
        type: dataTypes.TEXTFIELD,
        valuetype: 'text',
        placeholder: 'Fill in the name of applicant',
        message: 'Must be minimum 4 and max 80 length',
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4)
          ]
        }
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.PERSONAL.key + '_ADDRESS',
        type: dataTypes.TEXTAREA,
        valuetype: 'text',
        placeholder: 'Fill in the address of applicant',
        message: 'Must be minimum 10 and max 80 length',
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 10)
          ]
        }
      },
      {
        order: 3,
        label: 'Email Id',
        valuetype: 'text',
        key: sectionData.PERSONAL.key + '_EMAILID',
        placeholder: 'Fill in the email id of applicant',
        message: 'Must be minimum 4 and max 80 length',
        type: dataTypes.TEXTFIELD,
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4),
            (value) =>
              validationFunctions.regexTest(
                value,
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
              )
          ]
        }
      }
    ]
  },
  {
    key: 'BUSINESS',
    label: 'Business Details',
    fields: [
      {
        order: 1,
        label: 'Name',
        key: sectionData.BUSINESS.key + '_NAME',
        placeholder: 'Fill in the name of business',
        type: dataTypes.TEXTFIELD,
        valuetype: 'text',
        section: sectionData.BUSINESS.key,
        message: 'Must be minimum 4 and max 80 length',
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4)
          ]
        }
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.BUSINESS.key + '_ADDRESS',
        placeholder: 'Fill in the address of business',
        message: 'Must be minimum 10 and max 80 length',
        type: dataTypes.TEXTAREA,
        valuetype: 'text',
        section: sectionData.BUSINESS.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 10)
          ]
        }
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.BUSINESS.key + '_EMAILID',
        placeholder: 'Fill in the email id of business',
        message: 'Must be minimum 4 and max 80 length',
        type: dataTypes.TEXTFIELD,
        valuetype: 'text',
        section: sectionData.BUSINESS.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4),
            (value) =>
              validationFunctions.regexTest(
                value,
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
              )
          ]
        }
      }
    ]
  },
  {
    key: 'BANK',
    label: 'Bank Details',
    fields: [
      {
        order: 1,
        label: 'Account No',
        key: sectionData.BANK.key + '_ACCOUNTNO',
        placeholder: 'Fill in the account number of bank',
        message: 'Must be minimum 10 and max 13 length',
        type: dataTypes.TEXTFIELD,
        valuetype: 'number',
        section: sectionData.BANK.key,
        mandatory: true,
        constraints: {
          maxLength: 13,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 13),
            (value) => validationFunctions.minLength(value, 10)
          ]
        }
      },
      {
        order: 2,
        label: 'Bank Name',
        key: sectionData.BANK.key + '_BANKNAME',
        placeholder: 'Fill in the name of bank',
        message: 'Must be minimum 6 and max 20 length',
        valuetype: 'text',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        mandatory: true,
        constraints: {
          maxLength: 40,
          minLength: 6,
          regex: '',
          validations: [
            (value) => validationFunctions.maxLength(value, 20),
            (value) => validationFunctions.minLength(value, 6)
          ]
        }
      }
    ]
  }
];
