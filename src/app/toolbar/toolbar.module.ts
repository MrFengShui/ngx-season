import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusToolbar, OctopusToolbarLogo, OctopusToolbarRow} from "./toolbar.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusToolbar,
        OctopusToolbarRow,
        OctopusToolbarLogo
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusToolbar,
        OctopusToolbarRow,
        OctopusToolbarLogo
    ]
})
export class OctopusToolbarModule {}
