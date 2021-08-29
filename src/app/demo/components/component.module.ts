import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OctopusBadgeModule } from "src/app/components/badge/badge.module";
import { OctopusButtonModule } from "../../components/button/button.module";
import { OctopusIconModule } from "../../components/icon/icon.module";
import { OctopusPlaceholderModule } from "src/app/components/placeholder/placeholder.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";

import { DemoSectionCodeComponent, DemoSectionComponent, DemoSectionFootComponent } from "../demo.component";
import { DemoComponentOutlet } from "./component.component";
import { DemoBadgeView } from "./badge.component";
import { DemoButtonView } from "./button.component";
import { DemoPlaceholderView } from "./placeholder.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'badge', pathMatch: 'full' },
    { path: 'badge', component: DemoBadgeView, data: { breadcrumb: 'Badge' } },
    { path: 'button', component: DemoButtonView, data: { breadcrumb: 'Button' } },
    { path: 'placeholder', component: DemoPlaceholderView, data: { breadcrumb: 'Placeholder' } }
];

@NgModule({
    declarations: [
        DemoSectionComponent,
        DemoSectionCodeComponent,
        DemoSectionFootComponent,
        DemoComponentOutlet,
        DemoBadgeView,
        DemoButtonView,
        DemoPlaceholderView
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DEMO_ROUTERS),
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusIconModule,
        OctopusPlaceholderModule,
        OctopusRippleModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoSectionComponent,
        DemoSectionCodeComponent,
        DemoSectionFootComponent,
        DemoComponentOutlet,
        DemoBadgeView,
        DemoButtonView,
        DemoPlaceholderView
    ]
})
export class ComponentViewModule { }