import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";
import { NGXSeasonEffectsModule } from "../effects/effects.module";

import { NGXSeasonSelectComponent, NGXSeasonSelectOptionComponent } from "./select.component";

@NgModule({
    declarations: [
        NGXSeasonSelectComponent,
        NGXSeasonSelectOptionComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,

        NGXSeasonIconModule,
        NGXSeasonEffectsModule
    ],
    exports: [
        NGXSeasonSelectComponent,
        NGXSeasonSelectOptionComponent
    ]
})
export class NGXSeasonSelectModule {}
