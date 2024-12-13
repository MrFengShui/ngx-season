import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonStatusComponent } from "./status.component";

@NgModule({
    declarations: [
        NGXSeasonStatusComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonStatusComponent
    ]
})
export class NGXSeasonStatusModule {}
