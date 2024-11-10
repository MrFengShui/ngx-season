import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

import { NGXSeasonCheckColor } from "src/app/components/check/check.component";

@Component({
    selector: 'ngx-sui-demo-check-switch-page',
    templateUrl: './check-switch.component.html'
})
export class DemoCheckSwitchPageComponent {
    
        protected list: Array<{ color: NGXSeasonCheckColor, check: boolean, label: string }> = [
            { color: 'default', check: false, label: '默认检查框' },
            { color: 'primary', check: false, label: '主要检查框' },
            { color: 'accent', check: false, label: '强调检查框' },
            { color: 'success', check: false, label: '成功检查框' },
            { color: 'warning', check: false, label: '警告检查框' },
            { color: 'failure', check: false, label: '错误检查框' },
            { color: 'info', check: false, label: '信息检查框' },
        ];
    
        protected group: FormGroup = this._builder.group({
            defaultCheckboxControl: new FormControl({ value: true, disabled: false }),
            primaryCheckboxControl: new FormControl({ value: true, disabled: false }),
            accentCheckboxControl: new FormControl({ value: true, disabled: false }),
            successCheckboxControl: new FormControl({ value: true, disabled: false }),
            warningCheckboxControl: new FormControl({ value: true, disabled: false }),
            failureCheckboxControl: new FormControl({ value: true, disabled: false }),
            infoCheckboxControl: new FormControl({ value: true, disabled: false }),
        });
    
        constructor(private _builder: FormBuilder) {}
    
}