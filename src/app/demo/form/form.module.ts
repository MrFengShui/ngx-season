import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusCheckboxModule } from "src/app/form/check/check.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusInputModule } from "src/app/form/input/input.module";
import { OctopusRangeModule } from "src/app/form/range/range.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";
import { OctopusToggleModule } from "src/app/form/toggle/toggle.module";

import { DemoFormOutlet } from "./form.component";
import { DemoCheckboxView } from "./check.component";
import { DemoInputView } from "./input.component";
import { DemoRangeView } from "./range.component";
import { DemoSelectView } from "./select.component";
import { DemoToggleView } from "./toggle.component";


const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'input', pathMatch: 'full' },
    { path: 'checkbox', component: DemoCheckboxView, data: { breadcrumb: 'Checkbox' } },
    { path: 'input', component: DemoInputView, data: { breadcrumb: 'Input' } },
    { path: 'range', component: DemoRangeView, data: { breadcrumb: 'Range' } },
    { path: 'select', component: DemoSelectView, data: { breadcrumb: 'Select' } },
    { path: 'toggle', component: DemoToggleView, data: { breadcrumb: 'Toggle' } }
];

@NgModule({
    declarations: [
        DemoFormOutlet,
        DemoCheckboxView,
        DemoInputView,
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
        OctopusIconModule,
        OctopusInputModule,
        OctopusRangeModule,
        OctopusTabbedModule,
        OctopusToggleModule
    ],
    exports: [
        DemoFormOutlet,
        DemoCheckboxView,
        DemoInputView,
        DemoRangeView,
        DemoSelectView,
        DemoToggleView
    ]
})
export class FormViewModule { }