import { Component, OnInit } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

export class DemoCarouselViewModel {

    color?: ColorPalette;
    units?: Array<{ subject: string, description: string, source: string }>;
    texts?: string[];

}

@Component({
    selector: 'app-demo-carousel-view',
    templateUrl: './carousel.component.html'
})
export class DemoCarouselView implements OnInit {

    list: DemoCarouselViewModel[] = [];
    textList: DemoCarouselViewModel[] = [];

    ngOnInit() {
        ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'].forEach(item => {
            this.list.push({
                color: item.toLowerCase() as ColorPalette,
                units: [
                    { subject: `${item} Image Carousel Subject I`, description: `${item} Image Carousel Description I`, source: 'https://images.wallpaperscraft.com/image/single/hexagons_immersion_bw_133660_1280x720.jpg' },
                    { subject: `${item} Image Carousel Subject II`, description: `${item} Image Carousel Description II`, source: 'https://images.wallpaperscraft.com/image/single/pattern_tropical_flowers_130382_1280x720.jpg' },
                    { subject: `${item} Image Carousel Subject III`, description: `${item} Image Carousel Description III`, source: 'https://images.wallpaperscraft.com/image/single/kaleidoscope_mosaic_patterns_126058_1280x720.jpg' },
                    { subject: `${item} Image Carousel Subject IV`, description: `${item} Image Carousel Description IV`, source: 'https://images.wallpaperscraft.com/image/single/desert_sand_surface_141026_1280x720.jpg' }
                ]
            });
        });
        ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'].forEach(item => {
            this.textList.push({
                color: item.toLowerCase() as ColorPalette,
                texts: [`${item} Text Carousel Content I`, `${item} Text Carousel Content II`, `${item} Text Carousel Content III`, `${item} Text Carousel Content IV`]
            })
        });
    }

}