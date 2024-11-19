import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonRadioButtonComponent, NGXSeasonRadioButtonGroupComponent } from "./radio-button.component";
import { NGXSeasonRadioToggleGroupComponent, NGXSeasonRadioToggleComponent } from "./radio-toggle.component";

@NgModule({
    declarations: [
        NGXSeasonRadioButtonGroupComponent,
        NGXSeasonRadioButtonComponent,
        NGXSeasonRadioToggleGroupComponent,
        NGXSeasonRadioToggleComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonRadioButtonGroupComponent,
        NGXSeasonRadioButtonComponent,
        NGXSeasonRadioToggleGroupComponent,
        NGXSeasonRadioToggleComponent
    ]
})
export class NGXSeasonRadioModule {}
