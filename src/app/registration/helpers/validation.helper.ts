import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FieldValidation } from '../services/registration.model';

enum ValidationTypes {
  maxlength = 'maxlength',
  minlength = 'minlength',
  regex = 'regex',
}

const getRegexpValidatorFn = (regExpString: string, message: string): ValidatorFn => {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    return new RegExp(regExpString).test(value) || !value.length ? null : { error: { value: message } };
  };
};

const getMinLengthValidatorFn = (min: number, message: string): ValidatorFn => {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    return value.length >= min || !value.length ? null : { error: { value: message } };
  };
};

const getMaxLengtValidatorFn = (max: number, message: string): ValidatorFn => {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    return value.length <= max || !value.length ? null : { error: { value: message } };
  };
};

const getValidatorFn = ({ name, value , message} : FieldValidation): ValidatorFn | null => {
  const valueAsNumber = value as number;

  switch (name) {
    case ValidationTypes.maxlength:
      return getMaxLengtValidatorFn(valueAsNumber, message);
    case ValidationTypes.minlength:
      return getMinLengthValidatorFn(valueAsNumber, message);
    case ValidationTypes.regex:
      return getRegexpValidatorFn(value as string, message);
    default:
      return null;
  }
};

export const getValidators = (validations: FieldValidation[]): ValidatorFn[] => {
  return <ValidatorFn[]>validations
    .map((validation: FieldValidation): ValidatorFn | null => getValidatorFn(validation))
    .filter((fn: ValidatorFn | null): boolean => Boolean(fn));
};
