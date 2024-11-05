import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NGXSeasonCardPlaceholderComponent, NGXSeasonPlaceholderShapeDirective } from "./placeholder.component";

@NgModule({
    declarations: [
        NGXSeasonPlaceholderShapeDirective,
        NGXSeasonCardPlaceholderComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonCardPlaceholderComponent
    ]
})
export class NGXSeasonPlaceholderModule {}