import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusDialogModule } from "src/app/popup/dialog/dialog.module";
import { OctopusDrawerModule } from "src/app/popup/drawer/drawer.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";
import { OctopusToastModule } from "src/app/popup/toast/toast.module";
import { OctopusTooltipModule } from "src/app/popup/tooltip/tooltip.module";

import { DemoPopupOutlet } from "./popup.component";
import { DemoTooltipView } from "./tooltip.component";
import { DemoToastView } from "./toast.component";
import { DemoDrawerView, DemoDrawerViewContainer } from "./drawer.component";
import { DemoDialogView, DemoDialogViewContainer } from "./dialog.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'tooltip', pathMatch: 'full' },
    { path: 'dialog', component: DemoDialogView, data: { breadcrumb: 'Dialog' } },
    { path: 'drawer', component: DemoDrawerView, data: { breadcrumb: 'Drawer' } },
    { path: 'toast', component: DemoToastView, data: { breadcrumb: 'Toast' } },
    { path: 'tooltip', component: DemoTooltipView, data: { breadcrumb: 'Tooltip' } },
];

@NgModule({
    declarations: [
        DemoPopupOutlet,
        DemoDialogView,
        DemoDialogViewContainer,
        DemoDrawerView,
        DemoDrawerViewContainer,
        DemoToastView,
        DemoTooltipView
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusButtonModule,
        OctopusDialogModule,
        OctopusDrawerModule,
        OctopusTabbedModule,
        OctopusToastModule,
        OctopusTooltipModule,
    ],
    exports: [
        DemoPopupOutlet,
        DemoDialogView,
        DemoDialogViewContainer,
        DemoDrawerView,
        DemoDrawerViewContainer,
        DemoToastView,
        DemoTooltipView
    ]
})
export class PopupViewModule { }