import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DemoModule } from "../demo.module";
import { OctopusAvatarModule } from "src/app/components/avatar/avatar.module";
import { OctopusBadgeModule } from "src/app/components/badge/badge.module";
import { OctopusBreadcrumbModule } from "src/app/components/breadcrumb/breadcrumb.module";
import { OctopusButtonModule } from "../../components/button/button.module";
import { OctopusCardModule } from "src/app/components/card/card.module";
import { OctopusCarouselModule } from "src/app/components/carousel/carousel.module";
import { OctopusDividerModule } from "src/app/components/divider/divider.module";
import { OctopusIconModule } from "../../components/icon/icon.module";
import { OctopusPaginatorModule } from "src/app/components/paginator/paginator.module";
import { OctopusPlaceholderModule } from "src/app/components/placeholder/placeholder.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";

import { DemoComponentOutlet } from "./component.component";
import { DemoAvatarView } from "./avatar.component";
import { DemoBadgeView } from "./badge.component";
import { DemoBreadcrumbView } from "./breadcrumb.component";
import { DemoButtonView } from "./button.component";
import { DemoCardView } from "./card.component";
import { DemoCarouselView } from "./carousel.component";
import { DemoPaginatorView } from "./paginator.component";
import { DemoPlaceholderView } from "./placeholder.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'avatar', pathMatch: 'full' },
    { path: 'avatar', component: DemoAvatarView, data: { breadcrumb: 'Avatar' } },
    { path: 'badge', component: DemoBadgeView, data: { breadcrumb: 'Badge' } },
    { path: 'breadcrumb', component: DemoBreadcrumbView, data: { breadcrumb: 'Breadcrumb' } },
    { path: 'button', component: DemoButtonView, data: { breadcrumb: 'Button' } },
    { path: 'card', component: DemoCardView, data: { breadcrumb: 'Card' } },
    { path: 'carousel', component: DemoCarouselView, data: { breadcrumb: 'Carousel' } },
    { path: 'paginator', component: DemoPaginatorView, data: { breadcrumb: 'Paginator' } },
    { path: 'placeholder', component: DemoPlaceholderView, data: { breadcrumb: 'Placeholder' } }
];

@NgModule({
    declarations: [
        DemoComponentOutlet,
        DemoAvatarView,
        DemoBadgeView,
        DemoBreadcrumbView,
        DemoButtonView,
        DemoCardView,
        DemoCarouselView,
        DemoPaginatorView,
        DemoPlaceholderView
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusAvatarModule,
        OctopusBadgeModule,
        OctopusBreadcrumbModule,
        OctopusButtonModule,
        OctopusCardModule,
        OctopusCarouselModule,
        OctopusIconModule,
        OctopusDividerModule,
        OctopusPaginatorModule,
        OctopusPlaceholderModule,
        OctopusRippleModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoComponentOutlet,
        DemoAvatarView,
        DemoBadgeView,
        DemoBreadcrumbView,
        DemoButtonView,
        DemoCardView,
        DemoCarouselView,
        DemoPaginatorView,
        DemoPlaceholderView
    ]
})
export class ComponentViewModule { }