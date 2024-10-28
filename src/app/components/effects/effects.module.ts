import { NgModule } from "@angular/core";

import { NGXSeasonRippleDirective } from "./ripple.directive";
import { NGXSeasonScrollbarDirective } from "./scrollbar.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        NGXSeasonRippleDirective,
        NGXSeasonScrollbarDirective
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonRippleDirective,
        NGXSeasonScrollbarDirective
    ]
})
export class NGXSeasonEffectsModule {}