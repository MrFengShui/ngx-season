import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusRipple} from "./ripple.directive";

@NgModule({
    declarations: [
        OctopusRipple
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusRipple
    ]
})
export class OctopusEffectsModule {}
