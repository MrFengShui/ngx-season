import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonBadgeDirective } from "./badge.directive";

@NgModule({
    declarations: [ NGXSeasonBadgeDirective ],
    imports: [ CommonModule ],
    exports: [ NGXSeasonBadgeDirective ]
})
export class NGXSeasonBadgeModule {}