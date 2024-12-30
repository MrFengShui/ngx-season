import { Component } from "@angular/core";

import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonSizeOption } from "src/app/utils/size.utils";

@Component({
    selector: 'ngx-sui-demo-button-page',
    templateUrl: './button.component.html'
})
export class DemoButtonPageComponent {

    protected colorList: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认按钮' },
        { color: 'primary', label: '主要按钮' },
        { color: 'accent', label: '强调按钮' },
        { color: 'success', label: '成功按钮' },
        { color: 'warning', label: '警告按钮' },
        { color: 'failure', label: '错误按钮' },
        { color: 'info', label: '信息按钮' },
        { color: 'help', label: '帮助按钮' }
    ];
    protected sizeList: Array<{ size: NGXSeasonSizeOption, text: string }> = [
        { size: 'xs', text: '特小号按钮' },
        { size: 'sm', text: '小号按钮' },
        { size: 'md', text: '普通按钮' },
        { size: 'lg', text: '大号按钮' },
        { size: 'xl', text: '加大号按钮' },
        { size: 'xxl', text: '特大号按钮' },
        { size: 'xxxl', text: '极大号按钮' },
        { size: 'xxxxl', text: '最大号按钮' },
    ];
    protected groupList: Array<{ icon: NGXSeasonIconName, text: string }> = [
        { icon: 'align-left-text', text: '居左对齐' },
        { icon: 'align-center-text', text: '居中对齐' },
        { icon: 'align-right-text', text: '居右对齐' },
        { icon: 'align-justify-text', text: '两端对齐' }
    ];

}
