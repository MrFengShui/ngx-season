import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonProgressBarComponent } from "./progress-bar.component";
import { NGXSeasonProgressRingComponent } from "./progress-ring.component";
import { NGX_SEASON_PROGRESS_SIZE_TOKEN } from "./progress.component";

@NgModule({
    declarations: [
        NGXSeasonProgressBarComponent,
        NGXSeasonProgressRingComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonProgressBarComponent,
        NGXSeasonProgressRingComponent
    ],
    providers: [{ provide: NGX_SEASON_PROGRESS_SIZE_TOKEN, useValue: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } }]
})
export class NGXSeasonProgressModule {}
