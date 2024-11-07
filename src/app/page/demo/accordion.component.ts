import { Component } from "@angular/core";

import { NGXSeasonAccordionColor } from "src/app/components/accordion/accordion.component";
import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

@Component({
    selector: 'ngx-sui-demo-accordion-page',
    templateUrl: './accordion.component.html'
})
export class DemoAccordionPageComponent {

    protected colors: NGXSeasonAccordionColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected list: Array<{ icon: NGXSeasonIconName, subject: string, description: string }> = [
        { icon: 'home', subject: '折叠面板一（主题）', description: '折叠面板一（描述）' },
        { icon: 'home', subject: '折叠面板二（主题）', description: '折叠面板二（描述）' },
        { icon: 'home', subject: '折叠面板三（主题）', description: '折叠面板三（描述）' },
        { icon: 'home', subject: '折叠面板四（主题）', description: '折叠面板四（描述）' },
        { icon: 'home', subject: '折叠面板五（主题）', description: '折叠面板五（描述）' },
        { icon: 'home', subject: '折叠面板六（主题）', description: '折叠面板六（描述）' },
    ];

    protected selectedIndexList: number[] = this.colors.map(() => 0);

    protected handleTogglePreviousPanelEvent(index: number): void {
        this.selectedIndexList[index] -= 1;
        this.selectedIndexList[index] = this.selectedIndexList[index] === -1 ? this.list.length - 1 : this.selectedIndexList[index];
    }

    protected handleToggleCurrentPanelEvent(index: number): void {
        this.selectedIndexList[index] += 1;
        this.selectedIndexList[index] = this.selectedIndexList[index] === this.list.length ? 0 : this.selectedIndexList[index];
    }

    protected handleSelectedIndexEvent(selectedIndex: number, index: number): void {
        this.selectedIndexList[index] = selectedIndex;
    }

}