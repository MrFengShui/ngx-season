import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonProgressBarComponent } from "./progress-bar.component";
import { NGXSeasonProgressRingComponent } from "./progress-ring.component";
import { NGXSeasonProgressComponent } from "./progress.component";

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