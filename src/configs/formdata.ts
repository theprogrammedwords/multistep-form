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
  type: DataTypes;
  section: string;
  mandatory?: boolean;
  placeholder: string;
  value?: null | undefined | any;
  isFilled?: boolean;
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
        type: dataTypes.TEXTFIELD,
        placeholder: 'Fill in the name of applicant',
        section: sectionData.PERSONAL.key,
        mandatory: true
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.PERSONAL.key + '_address',
        type: dataTypes.TEXTAREA,
        placeholder: 'Fill in the address of applicant',
        section: sectionData.PERSONAL.key,
        mandatory: true
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.PERSONAL.key + '_emailid',
        placeholder: 'Fill in the email id of applicant',
        type: dataTypes.TEXTFIELD,
        section: sectionData.PERSONAL.key,
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
        key: sectionData.BUSINESS.key + '_name',
        placeholder: 'Fill in the name of business',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BUSINESS.key,
        mandatory: true
      },
      {
        order: 2,
        label: 'Address',
        key: sectionData.BUSINESS.key + '_address',
        placeholder: 'Fill in the address of business',
        type: dataTypes.TEXTAREA,
        section: sectionData.BUSINESS.key,
        mandatory: true
      },
      {
        order: 3,
        label: 'Email Id',
        key: sectionData.BUSINESS.key + '_emailid',
        placeholder: 'Fill in the email id of business',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BUSINESS.key,
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
        placeholder: 'Fill in the account number of bank',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        mandatory: true
      },
      {
        order: 2,
        label: 'Bank Name',
        key: sectionData.BANK.key + '_bankname',
        placeholder: 'Fill in the name of bank',
        type: dataTypes.TEXTFIELD,
        section: sectionData.BANK.key,
        mandatory: true
      }
    ]
  }
];
