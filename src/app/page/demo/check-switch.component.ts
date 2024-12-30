import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-check-switch-page',
    templateUrl: './check-switch.component.html'
})
export class DemoCheckSwitchPageComponent {

        protected list: Array<{ color: NGXSeasonColorPalette, check: boolean, label: string }> = [
            { color: 'default', check: false, label: '默认检查开关' },
            { color: 'primary', check: false, label: '主要检查开关' },
            { color: 'accent', check: false, label: '强调检查开关' },
            { color: 'success', check: false, label: '成功检查开关' },
            { color: 'warning', check: false, label: '警告检查开关' },
            { color: 'failure', check: false, label: '错误检查开关' },
            { color: 'info', check: false, label: '信息检查开关' },
            { color: 'help', check: false, label: '帮助检查开关' }
        ];

        protected group: FormGroup = this._builder.group({
            defaultCheckboxControl: new FormControl({ value: true, disabled: false }),
            primaryCheckboxControl: new FormControl({ value: true, disabled: false }),
            accentCheckboxControl: new FormControl({ value: true, disabled: false }),
            successCheckboxControl: new FormControl({ value: true, disabled: false }),
            warningCheckboxControl: new FormControl({ value: true, disabled: false }),
            failureCheckboxControl: new FormControl({ value: true, disabled: false }),
            infoCheckboxControl: new FormControl({ value: true, disabled: false }),
            helpCheckboxControl: new FormControl({ value: true, disabled: false }),
        });

        constructor(private _builder: FormBuilder) {}

}
