import { FormControl } from '@angular/forms';

export class ValidationService {

  static getValidationErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Required',
      invalidEmailAddress: 'Please enter a valid email address',
      invalidPassword: 'Invalid password',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Maximum length ${validatorValue.requiredLength}`,
      invalidGroupYear: `Year cannot be a negative number`,
      invalidAmountOfPeople: `Amount of people cannot be 0 or less than 0`
    };

    return config[ validatorName ];
  }

  static emailValidator(control: FormControl) {
    // RFC 2822 compliant regex
    const regexp = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=' +
      '?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
    if (control.value.match(regexp)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static groupYearValidator(control: FormControl) {
    if (control.value > 0) {
      return null;
    } else {
      return { invalidGroupYear: true };
    }
  }

  static amountOfPeopleValidator(control: FormControl) {
    if (control.value > 0) {
      return null;
    } else {
      return { invalidAmountOfPeople: true };
    }
  }
}
