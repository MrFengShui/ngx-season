import { Component } from "@angular/core";
import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

@Component({
    selector: 'ngx-sui-demo-tag-page',
    templateUrl: './tag.component.html'
})
export class DemoTagPageComponent {

    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认标签' },
        { color: 'primary', label: '主要标签' },
        { color: 'accent', label: '强调标签' },
        { color: 'success', label: '成功标签' },
        { color: 'warning', label: '警告标签' },
        { color: 'failure', label: '失败标签' },
        { color: 'info', label: '信息标签' },
        { color: 'help', label: '帮助标签' }
    ];
    protected group: Array<{ color: NGXSeasonColorPalette, label: string }> = [];

    protected handleAddNewTagEvent(): void {
        const index: number = Math.floor(Math.random() * this.list.length);
        this.group.push(this.list[index]);
    }

}
