import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonCheckboxComponent } from "./checkbox.component";
import { NGXSeasonCheckSwitchComponent } from "./check-switch.component";

@NgModule({
    declarations: [
        NGXSeasonCheckboxComponent,
        NGXSeasonCheckSwitchComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NGXSeasonCheckboxComponent,
        NGXSeasonCheckSwitchComponent
    ]
})
export class NGXSeasonCheckModule {}