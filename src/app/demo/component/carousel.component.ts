import { Component, OnInit } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

export class DemoCarouselViewModel {

    color?: ColorPalette;
    units?: Array<{ subject: string, description: string, source: string }>;

}

@Component({
    selector: 'app-demo-carousel-view',
    templateUrl: './carousel.component.html'
})
export class DemoCarouselView implements OnInit {

    list: DemoCarouselViewModel[] = [];

    ngOnInit() {
        ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'].forEach(item => {
            this.list.push({
                color: item.toLowerCase() as ColorPalette,
                units: [
                    { subject: `${item} Carousel Subject I`, description: `${item} Carousel Description I`, source: 'https://images.wallpaperscraft.com/image/single/hexagons_immersion_bw_133660_1280x720.jpg' },
                    { subject: `${item} Carousel Subject II`, description: `${item} Carousel Description II`, source: 'https://images.wallpaperscraft.com/image/single/pattern_tropical_flowers_130382_1280x720.jpg' },
                    { subject: `${item} Carousel Subject III`, description: `${item} Carousel Description III`, source: 'https://images.wallpaperscraft.com/image/single/kaleidoscope_mosaic_patterns_126058_1280x720.jpg' },
                    { subject: `${item} Carousel Subject IV`, description: `${item} Carousel Description IV`, source: 'https://images.wallpaperscraft.com/image/single/desert_sand_surface_141026_1280x720.jpg' }
                ]
            });
        });
    }

}