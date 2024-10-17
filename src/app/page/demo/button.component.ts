import { Component } from "@angular/core";

import { NGXSeasonButtonColor } from "src/app/components/button.directive";

@Component({
    selector: 'ngx-sui-demo-button-page',
    templateUrl: './button.component.html'
})
export class DemoButtonPageComponent {

    protected colorList: Array<{ color: NGXSeasonButtonColor, label: string }> = [
        { color: 'default', label: '默认按钮' }, 
        { color: 'primary', label: '主要按钮' }, 
        { color: 'accent', label: '强调按钮' }, 
        { color: 'success', label: '成功按钮' }, 
        { color: 'warning', label: '警告按钮' }, 
        { color: 'failure', label: '错误按钮' }, 
        { color: 'info', label: '信息按钮' }
    ];

}