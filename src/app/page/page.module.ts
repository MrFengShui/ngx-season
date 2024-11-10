import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NGXSeasonComponentsModule } from "../components/components.module";

import { HomePageComponent } from "./home/home.component";
import { DemoPageComponent } from "./demo/demo.component";
import { ErrorPageComponent } from "./error/error.component";
import { DemoButtonPageComponent } from "./demo/button.component";
import { DemoAlertPageComponent } from "./demo/alert.component";
import { DemoAvatarPageComponent } from "./demo/avatar.component";
import { DemoCardPageComponent } from "./demo/card.component";
import { DemoAccordionPageComponent } from "./demo/accordion.component";
import { DemoBadgePageComponent } from "./demo/badge.component";
import { DemoRibbonPageComponent } from "./demo/ribbon.component";
import { DemoCarouselPageComponent } from "./demo/carousel.component";
import { DemoProgressPageComponent } from "./demo/progress.component";
import { DemoDigitalPageComponent } from "./demo/digital.component";
import { DemoPlaceholderPageComponent } from "./demo/placeholder.component";
import { DemoBreadcrumbPageComponent } from "./demo/breadcrumb.component";
import { DemoBackgroundPageComponent } from "./demo/background.component";
import { DemoListPageComponent } from "./demo/list.component";
import { DemoIconPageComponent } from "./demo/icon.component";
import { DemoCheckboxPageComponent } from "./demo/checkbox.component";
import { DemoCheckSwitchPageComponent } from "./demo/check-switch.component";
import { DemoInputPageComponent } from "./demo/input.component";

@NgModule({
    declarations: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoAccordionPageComponent,
        DemoAlertPageComponent,
        DemoAvatarPageComponent,
        DemoBackgroundPageComponent,
        DemoBadgePageComponent,
        DemoBreadcrumbPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent,
        DemoCarouselPageComponent,
        DemoCheckboxPageComponent,
        DemoCheckSwitchPageComponent,
        DemoDigitalPageComponent,
        DemoIconPageComponent,
        DemoInputPageComponent,
        DemoListPageComponent,
        DemoPlaceholderPageComponent,
        DemoProgressPageComponent,
        DemoRibbonPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        NGXSeasonComponentsModule
    ],
    exports: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoAccordionPageComponent,
        DemoAlertPageComponent,
        DemoAvatarPageComponent,
        DemoBackgroundPageComponent,
        DemoBadgePageComponent,
        DemoBreadcrumbPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent,
        DemoCarouselPageComponent,
        DemoCheckboxPageComponent,
        DemoCheckSwitchPageComponent,
        DemoDigitalPageComponent,
        DemoIconPageComponent,
        DemoInputPageComponent,
        DemoListPageComponent,
        DemoPlaceholderPageComponent,
        DemoProgressPageComponent,
        DemoRibbonPageComponent
    ]
})
export class PageModule {}