import { Component } from "@angular/core";

import { NGXSeasonBadgeColor } from "src/app/components/badge/badge.directive";

@Component({
    selector: 'ngx-sui-demo-badge-page',
    templateUrl: './badge.component.html'
})
export class DemoBadgePageComponent {

    protected colors: NGXSeasonBadgeColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected badgeText: string = '99+'

    protected list: Array<{ color: NGXSeasonBadgeColor, text: string, visible: boolean }> = [
        { color: 'default', text: '默认徽章', visible: true },
        { color: 'primary', text: '主要徽章', visible: true },
        { color: 'accent', text: '强调徽章', visible: true },
        { color: 'success', text: '成功徽章', visible: true },
        { color: 'warning', text: '警告徽章', visible: true },
        { color: 'failure', text: '错误徽章', visible: true },
        { color: 'info', text: '信息徽章', visible: true }
    ];

}