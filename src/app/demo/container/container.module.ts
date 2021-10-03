import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusAvatarModule } from "src/app/components/avatar/avatar.module";
import { OctopusBreadcrumbModule } from "src/app/components/breadcrumb/breadcrumb.module";
import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusDividerModule } from "src/app/components/divider/divider.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusExpansionModule } from "src/app/container/expansion/expansion.module";
import { OctopusNavbarModule } from "src/app/container/navbar/navbar.module";
import { OctopusStepperModule } from "src/app/container/stepper/stepper.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";

import { DemoContainerOutlet } from "./container.component";
import { DemoExpansionView } from "./expansion.component";
import { DemoNavbarView } from "./navbar.component";
import { DemoStepperView } from "./stepper.component";
import { DemoTabbedView } from "./tabbed.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'expansion', pathMatch: 'full' },
    { path: 'expansion', component: DemoExpansionView, data: { breadcrumb: 'Expansion' } },
    { path: 'navbar', component: DemoNavbarView, data: { breadcrumb: 'Navbar' } },
    { path: 'stepper', component: DemoStepperView, data: { breadcrumb: 'Stepper' } },
    { path: 'tabbed', component: DemoTabbedView, data: { breadcrumb: 'Tabbed Pane' } }
];

@NgModule({
    declarations: [
        DemoContainerOutlet,
        DemoExpansionView,
        DemoNavbarView,
        DemoStepperView,
        DemoTabbedView
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusAvatarModule,
        OctopusBreadcrumbModule,
        OctopusButtonModule,
        OctopusDividerModule,
        OctopusIconModule,
        OctopusExpansionModule,
        OctopusNavbarModule,
        OctopusStepperModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoContainerOutlet,
        DemoExpansionView,
        DemoNavbarView,
        DemoStepperView,
        DemoTabbedView
    ]
})
export class ContainerViewModule { }