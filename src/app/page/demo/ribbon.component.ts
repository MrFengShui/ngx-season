import { Component } from "@angular/core";
import { NGXSeasonRibbonColor } from "src/app/components/ribbon/ribbon.component";

@Component({
    selector: 'ngx-sui-demo-ribbon-page',
    templateUrl: './ribbon.component.html'
})
export class DemoRibbonPageComponent {

    protected list: Array<{ color: NGXSeasonRibbonColor, label: string }> = [
        { color: 'default', label: '默认丝带' },
        { color: 'primary', label: '主要丝带' },
        { color: 'accent', label: '强调丝带' },
        { color: 'success', label: '成功丝带' },
        { color: 'warning', label: '警告丝带' },
        { color: 'failure', label: '错误丝带' },
        { color: 'info', label: '信息丝带' },
    ];

}