import { Component } from "@angular/core";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-tabbed-page',
    templateUrl: './tabbed.component.html'
})
export class DemoTabbedPageComponent {

    protected tabs: Array<{ tabLabel: string, tabContent: string }> = Array.from(new Array(16)).map((item, index) => ({ tabLabel: `选项卡标签——${index + 1}`, tabContent: `选项卡内容——${index + 1}` }));
    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认' }, { color: 'primary', label: '主要' }, { color: 'accent', label: '强调' },
        { color: 'success', label: '成功' }, { color: 'warning', label: '警告' }, { color: 'failure', label: '失败' }, { color: 'info', label: '信息' }, { color: 'help', label: '帮助' },
    ];

}
