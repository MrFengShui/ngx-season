import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusFigure, OctopusFigureCaption, OctopusIcon} from "./image.component";

@NgModule({
    declarations: [
        OctopusIcon,
        OctopusFigure,
        OctopusFigureCaption
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusIcon,
        OctopusFigure,
        OctopusFigureCaption
    ]
})
export class OctopusImageModule {}
