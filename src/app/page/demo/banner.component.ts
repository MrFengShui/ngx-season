import { Component } from "@angular/core";

import { NGXSeasonBannerManner } from "src/app/components/banner/banner.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonAnimationSpeed } from "src/app/utils/animate.utils";

@Component({
    selector: 'ngx-sui-demo-banner-page',
    templateUrl: './banner.component.html',
    styles: `
        :host {
            .toolbar {
                position: sticky;
                top: 0;
                z-index: 10;
            }
        }
    `
})
export class DemoBannerPageComponent {

    protected colorList: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认' }, { color: 'primary', label: '主要' }, { color: 'accent', label: '强调' },
        { color: 'success', label: '成功' }, { color: 'warning', label: '警告' }, { color: 'failure', label: '失败' }, { color: 'info', label: '信息' }, { color: 'help', label: '帮助' },
    ];
    protected speedList: Array<{ speed: NGXSeasonAnimationSpeed, label: string }> = [
        { speed: 'xs', label: '极慢' }, { speed: 'sl', label: '慢速' },
        { speed: 'md', label: '普通' },
        { speed: 'fa', label: '快速' }, { speed: 'xf', label: '极快' },
    ];

    protected color: NGXSeasonColorPalette = 'default';
    protected manner: NGXSeasonBannerManner = 'alternate';
    protected speed: NGXSeasonAnimationSpeed = 'md';
    protected showShadow: boolean = false;

}
