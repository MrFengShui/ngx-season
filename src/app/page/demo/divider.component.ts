import { Component } from "@angular/core";

import { NGXSeasonDividerColor } from "src/app/components/divider/divider.component";

@Component({
    selector: 'ngx-sui-demo-divider-page',
    templateUrl: './divider.component.html'
})
export class DemoDividerPageComponent {

    protected list: Array<{ color: NGXSeasonDividerColor, label: string }> = [
        { color: 'default', label: '默认分割器' },
        { color: 'primary', label: '主要分割器' },
        { color: 'accent', label: '强调分割器' },
        { color: 'success', label: '成功分割器' },
        { color: 'warning', label: '警告分割器' },
        { color: 'failure', label: '失败分割器' },
        { color: 'info', label: '信息分割器' }
    ];

}
