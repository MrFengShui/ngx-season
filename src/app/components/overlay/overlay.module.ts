import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonTooltipComponent } from './tooltip.component';

@NgModule({
    declarations: [
        NGXSeasonTooltipComponent
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        NGXSeasonTooltipComponent
    ]
})
export class NGXSeasonOverlayModule {}