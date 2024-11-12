import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGX_SEASON_DIVIDER_THICKNESS_MAP_TOKEN, NGXSeasonHorizontalDividerComponent, NGXSeasonVerticalDividerComponent } from "./divider.component";

@NgModule({
    declarations: [
        NGXSeasonHorizontalDividerComponent,
        NGXSeasonVerticalDividerComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonHorizontalDividerComponent,
        NGXSeasonVerticalDividerComponent
    ],
    providers: [{ provide: NGX_SEASON_DIVIDER_THICKNESS_MAP_TOKEN, useValue: { thin: 1, normal: 2, thick: 3 } }]
})
export class NGXSeasonDividerModule {}
