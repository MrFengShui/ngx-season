import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkMenuModule} from "@angular/cdk/menu";

import {OctopusCalendar, OctopusDateTime, OctopusDigitClock} from "./datetime.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusButtonModule} from "../button/button.module";

@NgModule({
    declarations: [
        OctopusCalendar,
        OctopusDigitClock,
        OctopusDateTime
    ],
    imports: [
        CommonModule,
        CdkMenuModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusCalendar,
        OctopusDigitClock,
        OctopusDateTime
    ]
})
export class OctopusDatetimeModule {}
