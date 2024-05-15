# Form Data

## Personal Details

### Name
- **Order**: 1
- **Key**: PERSONAL_NAME
- **Type**: Textfield
- **Value Type**: Text
- **Placeholder**: Fill in the name of applicant
- **Message**: Must be minimum 4 and max 80 length
- **Section**: PERSONAL
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 4
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 4)`

### Address
- **Order**: 2
- **Key**: PERSONAL_ADDRESS
- **Type**: Textarea
- **Value Type**: Text
- **Placeholder**: Fill in the address of applicant
- **Message**: Must be minimum 10 and max 80 length
- **Section**: PERSONAL
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 10
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 10)`

### Email Id
- **Order**: 3
- **Key**: PERSONAL_EMAILID
- **Type**: Textfield
- **Value Type**: Text
- **Placeholder**: Fill in the email id of applicant
- **Message**: Must be minimum 4 and max 80 length
- **Section**: PERSONAL
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 4
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 4)`
    - `validationFunctions.regexTest(value, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)`

## Business Details

### Name
- **Order**: 1
- **Key**: BUSINESS_NAME
- **Type**: Textfield
- **Value Type**: Text
- **Placeholder**: Fill in the name of business
- **Message**: Must be minimum 4 and max 80 length
- **Section**: BUSINESS
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 4
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 4)`

### Address
- **Order**: 2
- **Key**: BUSINESS_ADDRESS
- **Type**: Textarea
- **Value Type**: Text
- **Placeholder**: Fill in the address of business
- **Message**: Must be minimum 10 and max 80 length
- **Section**: BUSINESS
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 10
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 10)`

### Email Id
- **Order**: 3
- **Key**: BUSINESS_EMAILID
- **Type**: Textfield
- **Value Type**: Text
- **Placeholder**: Fill in the email id of business
- **Message**: Must be minimum 4 and max 80 length
- **Section**: BUSINESS
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 80
  - **Min Length**: 4
  - **Validations**:
    - `validationFunctions.maxLength(value, 80)`
    - `validationFunctions.minLength(value, 4)`
    - `validationFunctions.regexTest(value, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)`

## Bank Details

### Account No
- **Order**: 1
- **Key**: BANK_ACCOUNTNO
- **Type**: Textfield
- **Value Type**: Number
- **Placeholder**: Fill in the account number of bank
- **Message**: Must be minimum 10 and max 13 length
- **Section**: BANK
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 13
  - **Min Length**: 10
  - **Validations**:
    - `validationFunctions.maxLength(value, 13)`
    - `validationFunctions.minLength(value, 10)`

### Bank Name
- **Order**: 2
- **Key**: BANK_BANKNAME
- **Type**: Textfield
- **Value Type**: Text
- **Placeholder**: Fill in the name of bank
- **Message**: Must be minimum 6 and max 20 length
- **Section**: BANK
- **Mandatory**: True
- **Constraints**:
  - **Max Length**: 20
  - **Min Length**: 6
  - **Validations**:
    - `validationFunctions.maxLength(value, 20)`
    - `validationFunctions.minLength(value, 6)`

# Extending Form Data

## Overview

This documentation explains how to extend the existing form data by adding new sections and fields. The form data is structured into sections, each containing multiple fields with specific constraints and properties.

## Existing Structure

### Sections
- **Personal Details**
  - Name
  - Address
  - Email Id
- **Business Details**
  - Name
  - Address
  - Email Id
- **Bank Details**
  - Account No
  - Bank Name

## How to Extend

### Step 1: Define a New Section

1. **Key**: Unique identifier for the section.
2. **Label**: Human-readable name for the section.
3. **Fields**: Array of field objects.

### Step 2: Add New Fields to the Section

Each field should have the following properties:
- **Order**: Determines the display order of the field within the section.
- **Label**: Human-readable name for the field.
- **Key**: Unique identifier for the field, usually a combination of section key and field name.
- **Type**: Type of the field (e.g., Textfield, Textarea).
- **Value Type**: Expected value type (e.g., text, number).
- **Placeholder**: Placeholder text for the field.
- **Message**: Validation message to be displayed.
- **Section**: The section to which this field belongs.
- **Mandatory**: Boolean indicating if the field is mandatory.
- **Constraints**: Object defining the validation constraints for the field.
  - **Max Length**: Maximum allowed length.
  - **Min Length**: Minimum required length.
  - **Regex**: Regular expression for pattern matching.
  - **Validations**: Array of validation functions.

### Example: Adding a New Section

#### 1. Define the Section

```javascript
{
  key: 'EMPLOYMENT',
  label: 'Employment Details',
  fields: [
    // Fields will be defined here
  ]
}


To extend the form data, you need to:

Define a new section with a unique key and label.
Add fields to the section, ensuring each field has the required properties and constraints.
By following these steps, you can easily add new sections and fields to the form data, accommodating additional information as needed.
