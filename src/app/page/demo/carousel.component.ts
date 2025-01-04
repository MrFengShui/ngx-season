import { Component, ElementRef, ViewChild } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-carousel-page',
    templateUrl: './carousel.component.html',
    styles: `
        :host {
            .grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-auto-flow: row;
                justify-items: stretch;
            }
        }
    `
})
export class DemoCarouselPageComponent {

    @ViewChild('cellBox', { read: ElementRef, static: false })
    protected cellBox: ElementRef<HTMLElement> | undefined;

    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认面板' },
        { color: 'primary', label: '主要面板' },
        { color: 'accent', label: '强调面板' },
        { color: 'success', label: '成功面板' },
        { color: 'warning', label: '警告面板' },
        { color: 'failure', label: '失败面板' },
        { color: 'info', label: '信息面板' },
        { color: 'help', label: '帮助面板' },
    ];
    protected options: Array<{ label: string, value: number }> = [
        { label: '1:1', value: 1 }, { label: '4:3', value: 4 / 3 }, { label: '21:9', value: 21 / 9 },
        { label: '16:9', value: 16 / 9 }, { label: '16:10', value: 16 / 10 }

    ];
    protected showCtrl: boolean = true;
    protected showOrbit: boolean = true;
    protected showProg: boolean = true;
    protected scale: number = 4 / 3;
    protected size: number = 360;

    protected calculateDimension(size: number): [number, number] {
        const width: number = (size - 48) * 0.25, height: number = width * 0.75;
        return [width, height];
    }

}
