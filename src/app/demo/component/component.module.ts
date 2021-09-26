import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { DemoModule } from "../demo.module";
import { OctopusAvatarModule } from "src/app/components/avatar/avatar.module";
import { OctopusBadgeModule } from "src/app/components/badge/badge.module";
import { OctopusBreadcrumbModule } from "src/app/components/breadcrumb/breadcrumb.module";
import { OctopusButtonModule } from "../../components/button/button.module";
import { OctopusCalendarModule } from "src/app/components/calendar/calendar.module";
import { OctopusCardModule } from "src/app/components/card/card.module";
import { OctopusCarouselModule } from "src/app/components/carousel/carousel.module";
import { OctopusChipModule } from "src/app/components/chip/chip.module";
import { OctopusDividerModule } from "src/app/components/divider/divider.module";
import { OctopusIconModule } from "../../components/icon/icon.module";
import { OctopusListModule } from "src/app/components/list/list.module";
import { OctopusPaginatorModule } from "src/app/components/paginator/paginator.module";
import { OctopusPlaceholderModule } from "src/app/components/placeholder/placeholder.module";
import { OctopusProgressModule } from "src/app/components/progress/progress.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";
import { OctopusTabbedModule } from "src/app/container/tabbed/tabbed.module";
import { OctopusTooltipModule } from "src/app/popup/tooltip/tooltip.module";

import { DemoComponentOutlet } from "./component.component";
import { DemoAvatarView } from "./avatar.component";
import { DemoBadgeView } from "./badge.component";
import { DemoBreadcrumbView } from "./breadcrumb.component";
import { DemoButtonView } from "./button.component";
import { DemoCalendarView } from "./calendar.component";
import { DemoCardView } from "./card.component";
import { DemoCarouselView } from "./carousel.component";
import { DemoChipView } from "./chip.component";
import { DemoDividerView } from "./divider.component";
import { DemoIconView } from "./icon.component";
import { DemoListView } from "./list.component";
import { DemoProgressView } from "./progress.component";
import { DemoPaginatorView } from "./paginator.component";
import { DemoPlaceholderView } from "./placeholder.component";

const DEMO_ROUTERS: Routes = [
    { path: '', redirectTo: 'avatar', pathMatch: 'full' },
    { path: 'avatar', component: DemoAvatarView, data: { breadcrumb: 'Avatar' } },
    { path: 'badge', component: DemoBadgeView, data: { breadcrumb: 'Badge' } },
    { path: 'breadcrumb', component: DemoBreadcrumbView, data: { breadcrumb: 'Breadcrumb' } },
    { path: 'button', component: DemoButtonView, data: { breadcrumb: 'Button' } },
    { path: 'calendar', component: DemoCalendarView, data: { breadcrumb: 'Calendar' } },
    { path: 'card', component: DemoCardView, data: { breadcrumb: 'Card' } },
    { path: 'carousel', component: DemoCarouselView, data: { breadcrumb: 'Carousel' } },
    { path: 'chip', component: DemoChipView, data: { breadcrumb: 'Ship' } },
    { path: 'divider', component: DemoDividerView, data: { breadcrumb: 'Divider' } },
    { path: 'icon', component: DemoIconView, data: { breadcrumb: 'Icon' } },
    { path: 'list', component: DemoListView, data: { breadcrumb: 'List' } },
    { path: 'paginator', component: DemoPaginatorView, data: { breadcrumb: 'Paginator' } },
    { path: 'placeholder', component: DemoPlaceholderView, data: { breadcrumb: 'Placeholder' } },
    { path: 'progress', component: DemoProgressView, data: { breadcrumb: 'Progress' } }
];

@NgModule({
    declarations: [
        DemoComponentOutlet,
        DemoAvatarView,
        DemoBadgeView,
        DemoBreadcrumbView,
        DemoButtonView,
        DemoCalendarView,
        DemoCardView,
        DemoCarouselView,
        DemoChipView,
        DemoDividerView,
        DemoIconView,
        DemoListView,
        DemoPaginatorView,
        DemoPlaceholderView,
        DemoProgressView
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(DEMO_ROUTERS),
        DemoModule,
        OctopusAvatarModule,
        OctopusBadgeModule,
        OctopusBreadcrumbModule,
        OctopusButtonModule,
        OctopusCalendarModule,
        OctopusCardModule,
        OctopusCarouselModule,
        OctopusChipModule,
        OctopusIconModule,
        OctopusDividerModule,
        OctopusListModule,
        OctopusPaginatorModule,
        OctopusPlaceholderModule,
        OctopusProgressModule,
        OctopusRippleModule,
        OctopusTabbedModule,
        OctopusTooltipModule
    ],
    exports: [
        DemoComponentOutlet,
        DemoAvatarView,
        DemoBadgeView,
        DemoBreadcrumbView,
        DemoButtonView,
        DemoCalendarView,
        DemoCardView,
        DemoCarouselView,
        DemoChipView,
        DemoDividerView,
        DemoIconView,
        DemoListView,
        DemoPaginatorView,
        DemoPlaceholderView,
        DemoProgressView
    ]
})
export class ComponentViewModule { }