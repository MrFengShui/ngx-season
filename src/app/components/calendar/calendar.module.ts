import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "../button/button.module";
import { OctopusDividerModule } from "../divider/divider.module";
import { OctopusIconModule } from "../icon/icon.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusCalendar, ZeroTextPipe } from "./calendar.component";

@NgModule({
    declarations: [
        OctopusCalendar,
        ZeroTextPipe
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusDividerModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusCalendar
    ]
})
export class OctopusCalendarModule { }