import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "../button/button.module";
import { OctopusIconModule } from "../icon/icon.module";

import { OctopusImageCarousel, OctopusImageCarouselUnit, OctopusTextCarousel, OctopusTextCarouselContent, OctopusTextCarouselPostfix, OctopusTextCarouselPrefix } from "./carousel.component";

@NgModule({
    declarations: [
        OctopusImageCarousel,
        OctopusImageCarouselUnit,
        OctopusTextCarousel,
        OctopusTextCarouselContent,
        OctopusTextCarouselPrefix,
        OctopusTextCarouselPostfix
    ],
    imports: [
        CommonModule,
        PortalModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusImageCarousel,
        OctopusImageCarouselUnit,
        OctopusTextCarousel,
        OctopusTextCarouselContent,
        OctopusTextCarouselPrefix,
        OctopusTextCarouselPostfix
    ]
})
export class OctopusCarouselModule { }