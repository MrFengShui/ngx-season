import { Component, HostBinding, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

import { PasswordValidatorUtils } from "src/app/utils/password.validator.utils";

@Component({
    selector: 'app-home-setting-security',
    templateUrl: './security.component.html'
})
export class HomeSettingSecurityComponent implements OnInit {

    @HostBinding('class') class: string = 'security';

    cpFormGroup!: FormGroup;
    npFormGroup!: FormGroup;
    ceFormGroup!: FormGroup;
    neFormGroup!: FormGroup;

    oldVisible!: boolean;
    newVisible!: boolean;
    safeVisible!: boolean;

    cpValue: string = '';
    npValue: string = '';
    napValue: string = '';

    ceValue: string = '';
    neValue: string = '';
    naeValue: string = '';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.cpFormGroup = this.fb.group({
            cpInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6)])
        });
        this.npFormGroup = this.fb.group({
            npInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6)]),
            napInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6), PasswordValidatorUtils.matchEqual('npInput')])
        });
        this.ceFormGroup = this.fb.group({
            ceInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6), Validators.email])
        });
        this.neFormGroup = this.fb.group({
            neInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6), Validators.email]),
            naeInput: new FormControl({ value: '' }, [Validators.required, Validators.minLength(6), Validators.email])
        });
        this.oldVisible = false;
        this.newVisible = false;
        this.safeVisible = false;
    }

    getErrorMessage(control: AbstractControl): string {
        if (control.getError('required')) {
            return 'Error: Password must be required.';
        } else if (control.getError('minlength')) {
            return 'Error: Password must be composed by 6 or more charactors.';
        } else if (control.getError('equal')) {
            return 'Error: Two passwords must be exactly same.';
        } else {
            return '';
        }
    }

}