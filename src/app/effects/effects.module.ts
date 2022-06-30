import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusOverflow, OctopusRipple, OctopusShadow} from "./effects.directive";

@NgModule({
    declarations: [
        OctopusOverflow,
        OctopusRipple,
        OctopusShadow
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusOverflow,
        OctopusRipple,
        OctopusShadow
    ]
})
export class OctopusEffectsModule {}
