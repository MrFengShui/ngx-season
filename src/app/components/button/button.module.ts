import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonButtonComponent, NGXSeasonOutlineButtonComponent, NGXSeasonSolidButtonComponent } from "./button.component";

@NgModule({
    declarations: [
        NGXSeasonButtonComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonSolidButtonComponent
    ],
    imports: [ 
        CommonModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonButtonComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonSolidButtonComponent
    ]
})
export class NGXSeasonButtonModule {}