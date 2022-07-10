import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkMenuModule} from "@angular/cdk/menu";

import {
    OctopusMenu,
    OctopusMenubar,
    OctopusMenuCheckItem,
    OctopusMenuGroup,
    OctopusMenuItem,
    OctopusMenuItemIcon, OctopusMenuRadioItem
} from "./menu.component";

import {OctopusEffectsModule} from "../effects/effects.module";
import {OctopusToolsModule} from "../tools/tools.module";
import {OctopusImageModule} from "../image/image.module";
import {OctopusButtonModule} from "../button/button.module";

@NgModule({
    declarations: [
        OctopusMenubar,
        OctopusMenuGroup,
        OctopusMenu,
        OctopusMenuItem,
        OctopusMenuCheckItem,
        OctopusMenuRadioItem,
        OctopusMenuItemIcon
    ],
    imports: [
        CommonModule,
        CdkMenuModule,
        OctopusButtonModule,
        OctopusEffectsModule,
        OctopusImageModule,
        OctopusToolsModule
    ],
    exports: [
        CdkMenuModule,
        OctopusMenubar,
        OctopusMenuGroup,
        OctopusMenu,
        OctopusMenuItem,
        OctopusMenuCheckItem,
        OctopusMenuRadioItem,
        OctopusMenuItemIcon
    ]
})
export class OctopusMenuModule {}
