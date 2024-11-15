import { Component } from "@angular/core";

import { NGXSeasonIconName } from "src/app/components/icon/icon.component";
import { NGXSeasonBreadcrumbMark } from './../../components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'ngx-sui-demo-breadcrumb-page',
    templateUrl: './breadcrumb.component.html'
})
export class DemoBreadcrumbPageComponent {

    protected items: Array<{ icon: NGXSeasonIconName, text: string }> = [
        { icon: 'devices', text: '设备' },
        { icon: 'computer', text: '计算机' },
        { icon: 'cpu', text: '中央处理器' },
    ];
    protected marks: NGXSeasonBreadcrumbMark[] = ['arrow', 'chevron', 'circle', 'point', 'rabbet', 'rhombus'];

}
