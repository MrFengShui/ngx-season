import { Component } from "@angular/core";

import { NGXSeasonCarouselColor } from "src/app/components/carousel/carousel.component";

@Component({
    selector: 'ngx-sui-demo-carousel-page',
    templateUrl: './carousel.component.html'
})
export class DemoCarouselPageComponent {

    protected colors: NGXSeasonCarouselColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected list: Array<{ url: string, text: string }> = [
        { url: 'assets/test/image_001.jpg', text: '轮播面板一' }, { url: 'assets/test/image_002.jpg', text: '轮播面板二' },
        { url: 'assets/test/image_003.jpg', text: '轮播面板三' }, { url: 'assets/test/image_004.jpg', text: '轮播面板四' },
        // { url: 'assets/test/image_005.jpg', text: '轮播面板五' }, { url: 'assets/test/image_006.jpg', text: '轮播面板六' },
    ];
    protected width: number = 960;

    protected change: any[] = [];

}