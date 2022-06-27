import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusCarousel, OctopusCarouselItem} from "./carousel.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusCarousel,
        OctopusCarouselItem
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusCarousel,
        OctopusCarouselItem
    ]
})
export class OctopusCarouselModule {}
