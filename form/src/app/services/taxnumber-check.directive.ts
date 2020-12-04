import { AbstractControl, ValidatorFn } from "@angular/forms";

export function TaxNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    let taxNumber = control.value;
    if (taxNumber == undefined) {
      taxNumber = '';
    }
    let valid;
    valid = validatenip(taxNumber);

    return valid ? null : { 'sumvalid': { value: control.value } };
  };
}

function validatenip(nip) {
  var digits = nip.split("");
  var checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 * parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;
  return (parseInt(digits[9]) == checksum);

}
