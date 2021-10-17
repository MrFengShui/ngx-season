import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusCheckboxModule } from "src/app/form/check/check.module";
import { OctopusDividerModule } from "src/app/components/divider/divider.module";
import { OctopusFieldModule } from "src/app/form/field/field.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusInputModule } from "src/app/form/input/input.module";
import { OctopusLayoutModule } from "src/app/layout/layout.module";
import { OctopusNumberModule } from "src/app/form/number/number.module";
import { OctopusPickerModule } from "src/app/form/picker/picker.module";
import { OctopusRadioModule } from "src/app/form/radio/radio.module";
import { OctopusRangeModule } from "src/app/form/range/range.module";
import { OctopusSelectModule } from "src/app/form/select/select.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";
import { OctopusToggleModule } from "src/app/form/toggle/toggle.module";

import { DemoFormOutlet } from "./form.component";
import { DemoCheckboxView } from "./check.component";
import { DemoFieldView } from "./field.component";
import { DemoInputView } from "./input.component";
import { DemoNumberView } from "./number.component";
import { DemoPickerView } from "./picker.component";
import { DemoRangeView } from "./range.component";
import { DemoRadioButtonView } from "./radio.component";
import { DemoSelectView } from "./select.component";
import { DemoToggleView } from "./toggle.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'input', pathMatch: 'full' },
    { path: 'checkbox', component: DemoCheckboxView, data: { breadcrumb: 'Checkbox' } },
    { path: 'field', component: DemoFieldView, data: { breadcrumb: 'Field' } },
    { path: 'input', component: DemoInputView, data: { breadcrumb: 'Input' } },
    { path: 'number', component: DemoNumberView, data: { breadcrumb: 'Number' } },
    { path: 'picker', component: DemoPickerView, data: { breadcrumb: 'Picker' } },
    { path: 'range', component: DemoRangeView, data: { breadcrumb: 'Range' } },
    { path: 'radiobutton', component: DemoRadioButtonView, data: { breadcrumb: 'RadioButton' } },
    { path: 'select', component: DemoSelectView, data: { breadcrumb: 'Select' } },
    { path: 'toggle', component: DemoToggleView, data: { breadcrumb: 'Toggle' } }
];

@NgModule({
    declarations: [
        DemoFormOutlet,
        DemoCheckboxView,
        DemoFieldView,
        DemoInputView,
        DemoNumberView,
        DemoPickerView,
        DemoRadioButtonView,
        DemoRangeView,
        DemoSelectView,
        DemoToggleView
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusButtonModule,
        OctopusCheckboxModule,
        OctopusDividerModule,
        OctopusFieldModule,
        OctopusIconModule,
        OctopusInputModule,
        OctopusLayoutModule,
        OctopusNumberModule,
        OctopusPickerModule,
        OctopusRadioModule,
        OctopusRangeModule,
        OctopusSelectModule,
        OctopusTabbedModule,
        OctopusToggleModule
    ],
    exports: [
        DemoFormOutlet,
        DemoCheckboxView,
        DemoFieldView,
        DemoInputView,
        DemoNumberView,
        DemoPickerView,
        DemoRadioButtonView,
        DemoRangeView,
        DemoSelectView,
        DemoToggleView
    ]
})
export class FormViewModule { }