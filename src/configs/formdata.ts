export type SectionData = {
  key: string;
  label: string;
};

export type DataTypes = 'TEXTAREA' | 'TEXTFIELD' | 'DATE';

export interface FormField {
  label: string;
  key: string;
  fields?: Field[];
}

export interface Field {
  order: number;
  label: string;
  key: string;
  value: string | undefined;
  type: DataTypes;
  section: string;
  isFilled: boolean;
  mandatory?: boolean;
  placeholder: string;
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
        key: sectionData.PERSONAL.key + '_name',
        value: undefined,
        type: dataTypes.TEXTFIELD,
        placeholder: 'Fill in the name of applicant',
        section: sectionData.PERSONAL.key,
        isFilled: false,
        mandatory: true
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.PERSONAL.key + '_address',
        value: undefined,
        type: dataTypes.TEXTAREA,
        placeholder: 'Fill in the address of applicant',
        section: sectionData.PERSONAL.key,
        isFilled: false,
        mandatory: true
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.PERSONAL.key + '_emailid',
        value: undefined,
        placeholder: 'Fill in the email id of applicant',
        type: dataTypes.TEXTFIELD,
        section: sectionData.PERSONAL.key,
        isFilled: false,
        mandatory: true
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
        value: undefined,
        key: sectionData.BUSINESS.key + '_name',
        placeholder: 'Fill in the name of business',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BUSINESS.key,
        isFilled: false,
        mandatory: true
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.BUSINESS.key + '_address',
        placeholder: 'Fill in the address of business',
        value: undefined,
        type: dataTypes.TEXTAREA,
        section: sectionData.BUSINESS.key,
        isFilled: false,
        mandatory: true
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.BUSINESS.key + '_emailid',
        value: undefined,
        placeholder: 'Fill in the email id of business',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BUSINESS.key,
        isFilled: false,
        mandatory: true
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
        key: sectionData.BANK.key + '_accountno',
        value: undefined,
        placeholder: 'Fill in the account number of bank',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        isFilled: false,
        mandatory: true
      },
      {
        order: 2,
        label: 'Bank Name',
        key: sectionData.BANK.key + '_bankname',
        placeholder: 'Fill in the name of bank',

        value: undefined,
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        isFilled: false,
        mandatory: true
      }
    ]
  }
];
