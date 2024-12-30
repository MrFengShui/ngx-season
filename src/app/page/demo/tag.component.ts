import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonIDUtils } from "src/app/utils/id.utils";

type TagMetaInfo = { id: string, color: NGXSeasonColorPalette, label: string };

@Component({
    selector: 'ngx-sui-demo-tag-page',
    templateUrl: './tag.component.html'
})
export class DemoTagPageComponent {

    protected tags: TagMetaInfo[] = [
        { id: 'default', color: 'default', label: '默认标签' },
        { id: 'primary', color: 'primary', label: '主要标签' },
        { id: 'success', color: 'accent', label: '强调标签' },
        { id: 'warning', color: 'success', label: '成功标签' },
        { id: 'warning', color: 'warning', label: '警告标签' },
        { id: 'failure', color: 'failure', label: '失败标签' },
        { id: 'info', color: 'info', label: '信息标签' },
        { id: 'help', color: 'help', label: '帮助标签' }
    ];
    protected list: TagMetaInfo[] = [];
    protected avatar: string = 'assets/test/card-avatar.png';
    protected emptyText: string = '暂无标签';

    protected handleInsertTagEvent(): void {
        const index: number = Math.floor(Math.random() * this.tags.length);
        const value: number = Math.floor(Math.random() * 1000);
        const label: string = `${this.tags[index].label}_${value}`;
        this.list.push({ id: NGXSeasonIDUtils.generateHashID(label), color: this.tags[index].color, label });
    }

    protected handleDeleteTagEvent(tag: TagMetaInfo): void {
        this.list = this.list.filter(item => item.id !== tag.id);
    }

}
