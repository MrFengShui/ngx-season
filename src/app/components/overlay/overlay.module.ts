import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonTooltipDirective } from './tooltip.directive';
import { NGXSeasonToastService } from './toast.service';

@NgModule({
    declarations: [
        NGXSeasonTooltipDirective
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        NGXSeasonTooltipDirective
    ],
    providers: [NGXSeasonToastService]
})
export class NGXSeasonOverlayModule {}
