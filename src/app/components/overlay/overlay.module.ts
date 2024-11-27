import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonTooltipDirective } from './tooltip.directive';
import { NGXSeasonToastService } from './toast.service';
import { NGXSeasonPopoverDirective } from './popover.directive';

@NgModule({
    declarations: [
        NGXSeasonPopoverDirective,
        NGXSeasonTooltipDirective
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        NGXSeasonPopoverDirective,
        NGXSeasonTooltipDirective
    ],
    providers: [NGXSeasonToastService]
})
export class NGXSeasonOverlayModule {}
