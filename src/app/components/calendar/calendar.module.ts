import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonDividerModule } from "../divider/divider.module";

import { NGXSeasonCalendarComponent } from "./calendar.component";
import { NGXSeasonCalendarContentComponent, NGXSeasonCalendarControlComponent, NGXSeasonCalendarLunarSelectionComponent } from "./calendar-widget.component";

@NgModule({
    declarations: [
        NGXSeasonCalendarComponent,
        NGXSeasonCalendarControlComponent,
        NGXSeasonCalendarContentComponent,
        NGXSeasonCalendarLunarSelectionComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonButtonModule,
        NGXSeasonDividerModule
    ],
    exports: [
        NGXSeasonCalendarComponent,
        NGXSeasonCalendarLunarSelectionComponent
    ]
})
export class NGXSeasonCalendarModule {}
