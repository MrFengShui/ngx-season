import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusCarousel } from "./carousel.component";

import { OctopusCarouselImage } from "./image.directive";

@NgModule({
    declarations: [
        OctopusCarousel,
        OctopusCarouselImage
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusCarousel,
        OctopusCarouselImage
    ]
})
export class OctopusCarouselModule { }