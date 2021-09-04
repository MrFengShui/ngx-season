import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusFormModule } from "src/app/form/form.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";

import { DemoFormOutlet } from "./form.component";
import { DemoInputView } from "./input.component";
import { DemoSelectView } from "./select.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'input', pathMatch: 'full' },
    { path: 'input', component: DemoInputView, data: { breadcrumb: 'Input' } },
    { path: 'select', component: DemoSelectView, data: { breadcrumb: 'Select' } }
];

@NgModule({
    declarations: [
        DemoFormOutlet,
        DemoInputView,
        DemoSelectView
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusFormModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoFormOutlet,
        DemoInputView,
        DemoSelectView
    ]
})
export class FormViewModule { }