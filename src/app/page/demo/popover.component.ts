import { Component } from "@angular/core";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-popover-page',
    templateUrl: './popover.component.html'
})
export class DemoPopoverPageComponent {

    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认悬浮框' },
        { color: 'primary', label: '主要悬浮框' },
        { color: 'accent', label: '强调悬浮框' },
        { color: 'success', label: '成功悬浮框' },
        { color: 'warning', label: '警告悬浮框' },
        { color: 'failure', label: '失败悬浮框' },
        { color: 'info', label: '信息悬浮框' },
        { color: 'help', label: '帮助悬浮框' }
    ];

}
