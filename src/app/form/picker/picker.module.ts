import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OctopusCalendarModule } from "src/app/components/calendar/calendar.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusProgressModule } from "src/app/components/progress/progress.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";
import { OctopusRangeModule } from "../range/range.module";

import { OctopusColorPicker, OctopusDatePicker, OctopusDatePickerDropdown, OctopusFilePicker } from "./picker.component";

@NgModule({
    declarations: [
        OctopusDatePicker,
        OctopusDatePickerDropdown,
        OctopusColorPicker,
        OctopusFilePicker
    ],
    imports: [
        CommonModule,
        OverlayModule,
        FormsModule,
        ReactiveFormsModule,
        OctopusCalendarModule,
        OctopusIconModule,
        OctopusProgressModule,
        OctopusRangeModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusDatePicker,
        OctopusDatePickerDropdown,
        OctopusColorPicker,
        OctopusFilePicker
    ]
})
export class OctopusPickerModule { }