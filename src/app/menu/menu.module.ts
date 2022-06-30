import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkMenuModule} from "@angular/cdk/menu";

import {OctopusMenu, OctopusMenuItem, OctopusMenuTrigger} from "./menu.component";

import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusMenuTrigger,
        OctopusMenu,
        OctopusMenuItem
    ],
    imports: [
        CommonModule,
        CdkMenuModule,
        OctopusEffectsModule
    ],
    exports: [
        CdkMenuModule,
        OctopusMenuTrigger,
        OctopusMenu,
        OctopusMenuItem
    ]
})
export class OctopusMenuModule {}
