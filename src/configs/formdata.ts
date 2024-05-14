import { validationFunctions } from '../utils/validationUtils';

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
  order: number;
  label: string;
  key: string;
  type: DataTypes;
  section: string;
  mandatory?: boolean;
  placeholder: string;
  value?: null | undefined | any;
  isFilled?: boolean;
  constraints?: Constraints;
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
        placeholder: 'Fill in the name of applicant',
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value: string) => validationFunctions.isRequired(value),
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
        placeholder: 'Fill in the address of applicant',
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 10)
          ]
        }
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.PERSONAL.key + '_EMAILID',
        placeholder: 'Fill in the email id of applicant',
        type: dataTypes.TEXTFIELD,
        section: sectionData.PERSONAL.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4)
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
        section: sectionData.BUSINESS.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
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
        type: dataTypes.TEXTAREA,
        section: sectionData.BUSINESS.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
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
        type: dataTypes.TEXTFIELD,
        section: sectionData.BUSINESS.key,
        mandatory: true,
        constraints: {
          maxLength: 80,
          minLength: 4,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
            (value) => validationFunctions.maxLength(value, 80),
            (value) => validationFunctions.minLength(value, 4)
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
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        mandatory: true,
        constraints: {
          maxLength: 13,
          minLength: 10,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
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
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        mandatory: true,
        constraints: {
          maxLength: 40,
          minLength: 6,
          regex: '',
          validations: [
            (value) => validationFunctions.isRequired(value),
            (value) => validationFunctions.maxLength(value, 40),
            (value) => validationFunctions.minLength(value, 6)
          ]
        }
      }
    ]
  }
];
