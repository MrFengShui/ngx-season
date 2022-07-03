import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusCarousel, OctopusCarouselBox, OctopusCarouselItem} from "./carousel.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusCarousel,
        OctopusCarouselBox,
        OctopusCarouselItem
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusCarousel,
        OctopusCarouselBox,
        OctopusCarouselItem
    ]
})
export class OctopusCarouselModule {}
