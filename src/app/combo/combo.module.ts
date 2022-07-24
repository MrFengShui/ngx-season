import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";

import {
    OctopusComboBox,
    OctopusComboItem,
    OctopusComboPanelHeader,
    OctopusComboPanelFooter, OctopusComboFavicon, OctopusComboLabel
} from "./combo.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusComboPanelHeader,
        OctopusComboPanelFooter,
        OctopusComboFavicon,
        OctopusComboLabel,
        OctopusComboBox,
        OctopusComboItem
    ],
    imports: [
        CommonModule,
        OverlayModule,
        OctopusButtonModule,
        OctopusEffectsModule,
        OctopusImageModule
    ],
    exports: [
        OctopusComboPanelHeader,
        OctopusComboPanelFooter,
        OctopusComboFavicon,
        OctopusComboLabel,
        OctopusComboBox,
        OctopusComboItem
    ]
})
export class OctopusComboModule {}
