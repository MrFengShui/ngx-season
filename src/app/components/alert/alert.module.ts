import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonAlertComponent, NGXSeasonTipAlertComponent } from "./alert.component";

@NgModule({
    declarations: [ 
        NGXSeasonAlertComponent,
        NGXSeasonTipAlertComponent
    ],
    imports: [
        CommonModule,
        NGXSeasonButtonModule,
        NGXSeasonIconModule
    ],
    exports: [ 
        NGXSeasonAlertComponent,
        NGXSeasonTipAlertComponent
    ]
})
export class NGXSeasonAlertModule {}