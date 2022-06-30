import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkAccordionModule} from "@angular/cdk/accordion";

import {
    OctopusAccordion,
    OctopusAccordionPanel,
    OctopusAccordionThumbnail
} from "./accordion.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusAccordion,
        OctopusAccordionPanel,
        OctopusAccordionThumbnail
    ],
    imports: [
        CommonModule,
        CdkAccordionModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusAccordion,
        OctopusAccordionPanel,
        OctopusAccordionThumbnail
    ]
})
export class OctopusAccordionModule {}
