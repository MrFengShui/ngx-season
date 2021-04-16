import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidatorUtils {

    static matchEqual(controlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.parent instanceof FormGroup) {
                let fg: FormGroup = control.parent;
                let fstValue: string = fg.controls[controlName].value;
                let sndValue: string = control.value;

                if (fstValue !== sndValue) {
                    return {
                        'equal': {
                            'fstValue': fstValue,
                            'sndValue': sndValue
                        }
                    }
                }
            }

            return null;
        }
    }

    static matchLength(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value.length < min || control.value.length > max) {
                return { 'matchLength': control.value.length };
            }

            return null;
        };
    }

}