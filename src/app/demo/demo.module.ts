import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { OctopusAvatarModule } from "../components/avatar/avatar.module";
import { OctopusBadgeModule } from "../components/badge/badge.module";
import { OctopusBreadcrumbModule } from "../components/breakcrumb/breadcrumb.module";
import { OctopusButtonModule } from "../components/button/button.module";
import { OctopusCardModule } from "../components/card/card.module";
import { OctopusCarouselModule } from "../components/carousel/carousel.module";
import { OctopusChipModule } from "../components/chip/chip.module";
import { OctopusCheckboxModule } from "../form/check/check.module";
import { OctopusDividerModule } from "../components/divider/divider.module";
import { OctopusExpansionModule } from "../container/expansion/expansion.module";
import { OctopusIconModule } from "../components/icon/icon.module";
import { OctopusListModule } from "../components/list/list.module";
import { OctopusProgressModule } from "../components/progress/progress.module";
import { OctopusRippleModule } from "../components/ripple/ripple.module";
import { OctopusFormModule } from "../form/form.module";
import { OctopusDialogModule } from "../popup/dialog/dialog.module";
import { OctopusTabbedModule } from "../container/tabbed/tabbed.module";

import { DemoAvatarViewComponent } from "./components/avatar.component";
import { DemoBadgeViewComponent } from "./components/badge.component";
import { DemoBreadcrumbViewComponent } from "./components/breadcrumb.component";
import { DemoButtonViewComponent } from "./components/button.component";
import { DemoCardViewComponent } from "./components/card.component";
import { DemoCarouselViewComponent } from "./components/carousel.component";
import { DemoChipViewComponent } from "./components/chip.component";
import { DemoDividerViewComponent } from "./components/divider.component";
import { DemoIconViewComponent } from "./components/icon.component";
import { DemoListViewComponent } from "./components/list.component";
import { DemoProgressViewComponent } from "./components/progress.component";

import { DemoExpansionViewComponent } from "./container/expansion.component";
import { DemoTabbedViewComponent } from "./container/tabbed.component";

import { DemoCheckboxViewComponent } from "./form/check.component";
import { DemoFieldViewComponent } from "./form/field.component";

import { DemoDialogViewComponent } from "./popup/dialog.component";
import { DemoWidgetDialogComponent } from "./popup/widget/dialog.component";

@NgModule({
    declarations: [
        DemoAvatarViewComponent,
        DemoBadgeViewComponent,
        DemoBreadcrumbViewComponent,
        DemoButtonViewComponent,
        DemoCardViewComponent,
        DemoCarouselViewComponent,
        DemoChipViewComponent,
        DemoCheckboxViewComponent,
        DemoDialogViewComponent,
        DemoWidgetDialogComponent,
        DemoDividerViewComponent,
        DemoExpansionViewComponent,
        DemoFieldViewComponent,
        DemoIconViewComponent,
        DemoListViewComponent,
        DemoProgressViewComponent,
        DemoTabbedViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        OctopusExpansionModule,
        OctopusAvatarModule,
        OctopusBadgeModule,
        OctopusBreadcrumbModule,
        OctopusButtonModule,
        OctopusChipModule,
        OctopusCardModule,
        OctopusCarouselModule,
        OctopusCheckboxModule,
        OctopusDialogModule,
        OctopusDividerModule,
        OctopusFormModule,
        OctopusIconModule,
        OctopusListModule,
        OctopusProgressModule,
        OctopusRippleModule,
        OctopusTabbedModule
    ],
    exports: [
        DemoAvatarViewComponent,
        DemoBadgeViewComponent,
        DemoBreadcrumbViewComponent,
        DemoButtonViewComponent,
        DemoCardViewComponent,
        DemoCarouselViewComponent,
        DemoChipViewComponent,
        DemoCheckboxViewComponent,
        DemoDialogViewComponent,
        DemoWidgetDialogComponent,
        DemoDividerViewComponent,
        DemoExpansionViewComponent,
        DemoFieldViewComponent,
        DemoIconViewComponent,
        DemoListViewComponent,
        DemoProgressViewComponent,
        DemoTabbedViewComponent
    ]
})
export class DemoViewModule { }