import { Component } from "@angular/core";

import { NGXSeasonToastPosition, NGXSeasonToastRef, NGXSeasonToastService } from "src/app/components/overlay/toast.service";

import { NGXSeasonAlertColorPalette } from "src/app/utils/_palette.utils";

@Component({
    selector: 'ngx-sui-demo-toast-page',
    templateUrl: './toast.component.html'
})
export class DemoToastPageComponent {

    protected list: Array<{ color: NGXSeasonAlertColorPalette, label: string, position: NGXSeasonToastPosition }> = [
        { color: 'success', label: '顶部显示（成功）', position: 'top' },
        { color: 'success', label: '底部显示（成功）', position: 'bottom' },
        { color: 'warning', label: '顶部显示（警告）', position: 'top' },
        { color: 'warning', label: '底部显示（警告）', position: 'bottom' },
        { color: 'failure', label: '顶部显示（失败）', position: 'top' },
        { color: 'failure', label: '底部显示（失败）', position: 'bottom' },
        { color: 'info', label: '顶部显示（信息）', position: 'top' },
        { color: 'info', label: '底部显示（信息）', position: 'bottom' },
        { color: 'help', label: '顶部显示（帮助）', position: 'top' },
        { color: 'help', label: '底部显示（帮助）', position: 'bottom' },
    ];

    private count: number = 0;

    constructor(private _toast: NGXSeasonToastService) {}

    protected handleTiggerToastEvent(color: NGXSeasonAlertColorPalette, label: string, position: NGXSeasonToastPosition): void {
        const toastRef: NGXSeasonToastRef = this._toast.create(`${label} 消息框！！！（第${++this.count}次）`, { color, showClose: true, position });
        toastRef.open();
        toastRef.opened().subscribe(() => console.debug('$$$opened$$$'));
        toastRef.closed().subscribe(() => console.debug('$$$closed$$$'));
    }

}
