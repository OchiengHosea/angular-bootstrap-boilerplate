import { FormControl, AbstractControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {

  static urlValidator(control: AbstractControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.startsWith('http') || control.value.startsWith('www');
      const errors = !matches ? { validationErrors: ['Invalid Url, Should start with http or www'] } : null;
      return errors;
    } else {
      return null;
    }
  }

  static phoneValidator(control: AbstractControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.startsWith('254') && (control.value.length === 12);
      const errors = !matches ? { validationErrors: ['Phone Should start with 254 and have 12 digits'] } : null;
      return errors;
    } else {
      return null;
    }
  }

  static nonEmptyArray(control: AbstractControl) {
    const matches = (control.value && control.value.length > 0);
    console.log(matches);
    return !matches ? { validationErrors: ['This field is required'] } : null;
  }

}
