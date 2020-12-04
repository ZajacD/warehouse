import { AbstractControl, ValidatorFn } from "@angular/forms";

// {8,100} - Min/Max characters
export class ValidationService {

  static email(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static password(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.}{[,;:'"])[a-zA-Z0-9!@#$%^&*.}{[,;:'"]{8,100}$/
    )) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }

  static zipCode(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /(?=.*[0-9]){2,5}[-]{1}[0-9]{2,4}?$/
    )) {
      return null;
    } else {
      return { invalidPostCode: true };
    }
  }

  static country(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż\s]{2,5}?$/
    )) {
      return null;
    } else {
      return { invalidCountry: true };
    }
  }


  static city(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]{2,25}?$/
    )) {
      return null;
    } else {
      return { invalidCity: true };
    }
  }

  static buyerName(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]{2,25}$/
    )) {
      return null;
    } else {
      return { invalidBuyerName: true };
    }
  }

  static place(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]{2,20}$/
    )) {
      return null;
    } else {
      return { invalidPlace: true };
    }
  }

  static CompanyName(control) {
    if (control.value === undefined) {
      control.value = '';
    }
    if (control.value.match(
      /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż\s]{2,200}?$/
    )) {
      return null;
    } else {
      return { invalidCompanyName: true };
    }
  }





}
