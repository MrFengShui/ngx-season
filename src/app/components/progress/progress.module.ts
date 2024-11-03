import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonProgressBarComponent, NGXSeasonProgressComponent, NGXSeasonProgressRingComponent } from "./progress-bar.component";

@NgModule({
    declarations: [
        NGXSeasonProgressComponent,
        NGXSeasonProgressBarComponent,
        NGXSeasonProgressRingComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonProgressBarComponent,
        NGXSeasonProgressRingComponent
    ]
})
export class NGXSeasonProgressModule {}