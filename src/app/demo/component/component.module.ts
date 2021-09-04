import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusBadgeModule } from "src/app/components/badge/badge.module";
import { OctopusButtonModule } from "../../components/button/button.module";
import { OctopusIconModule } from "../../components/icon/icon.module";
import { OctopusPaginatorModule } from "src/app/components/paginator/paginator.module";
import { OctopusPlaceholderModule } from "src/app/components/placeholder/placeholder.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";

import { DemoComponentOutlet } from "./component.component";
import { DemoBadgeView } from "./badge.component";
import { DemoButtonView } from "./button.component";
import { DemoPaginatorView } from "./paginator.component";
import { DemoPlaceholderView } from "./placeholder.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'avatar', pathMatch: 'full' },
    { path: 'badge', component: DemoBadgeView, data: { breadcrumb: 'Badge' } },
    { path: 'button', component: DemoButtonView, data: { breadcrumb: 'Button' } },
    { path: 'paginator', component: DemoPaginatorView, data: { breadcrumb: 'Paginator' } },
    { path: 'placeholder', component: DemoPlaceholderView, data: { breadcrumb: 'Placeholder' } }
];

@NgModule({
    declarations: [
        DemoComponentOutlet,
        DemoBadgeView,
        DemoButtonView,
        DemoPaginatorView,
        DemoPlaceholderView
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusIconModule,
        OctopusPaginatorModule,
        OctopusPlaceholderModule,
        OctopusRippleModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoComponentOutlet,
        DemoBadgeView,
        DemoButtonView,
        DemoPaginatorView,
        DemoPlaceholderView
    ]
})
export class ComponentViewModule { }