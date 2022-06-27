import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusExpress, OctopusExpressHead, OctopusExpressItem} from "./express.component";

import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusExpress,
        OctopusExpressHead,
        OctopusExpressItem
    ],
    imports: [
        CommonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusExpress,
        OctopusExpressHead,
        OctopusExpressItem
    ]
})
export class OctopusExpressModule {}
