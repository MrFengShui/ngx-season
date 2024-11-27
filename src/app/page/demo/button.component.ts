import { Component } from "@angular/core";

import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";
import { NGXSeasonSizeOption } from "src/app/utils/_size.utils";

@Component({
    selector: 'ngx-sui-demo-button-page',
    templateUrl: './button.component.html'
})
export class DemoButtonPageComponent {

    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认按钮' },
        { color: 'primary', label: '主要按钮' },
        { color: 'accent', label: '强调按钮' },
        { color: 'success', label: '成功按钮' },
        { color: 'warning', label: '警告按钮' },
        { color: 'failure', label: '错误按钮' },
        { color: 'info', label: '信息按钮' },
        { color: 'help', label: '帮助按钮' }
    ];
    protected sizes: NGXSeasonSizeOption[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

    protected readonly DEMO_ICON: NGXSeasonIconName = 'users';

}
