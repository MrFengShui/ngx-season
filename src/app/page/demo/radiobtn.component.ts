import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-radiobtn-page',
    templateUrl: './radiobtn.component.html'
})
export class DemoRadioButtonPageComponent {

    protected list: Array<{ color: NGXSeasonColorPalette, value: string, label: string }> = [
            { color: 'default', value: 'default', label: '默认选择框' },
            { color: 'primary', value: 'primary', label: '主要选择框' },
            { color: 'accent', value: 'accent', label: '强调选择框' },
            { color: 'success', value: 'success', label: '成功选择框' },
            { color: 'warning', value: 'warning', label: '警告选择框' },
            { color: 'failure', value: 'failure', label: '错误选择框' },
            { color: 'info', value: 'info', label: '信息选择框' },
            { color: 'help', value: 'help', label: '帮助选择框' },
        ];

    protected values: string[] = ['success', 'warning'];
    protected disabled: boolean = false;

}
