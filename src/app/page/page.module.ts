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
import { DemoBannerPageComponent } from "./demo/banner.component";
import { DemoBreadcrumbPageComponent } from "./demo/breadcrumb.component";
import { DemoBackgroundPageComponent } from "./demo/background.component";
import { DemoListPageComponent } from "./demo/list.component";
import { DemoIconPageComponent } from "./demo/icon.component";
import { DemoCheckboxPageComponent } from "./demo/checkbox.component";
import { DemoCheckSwitchPageComponent } from "./demo/check-switch.component";
import { DemoInputPageComponent } from "./demo/input.component";
import { DemoTooltipPageComponent } from "./demo/tooltip.component";
import { DemoComponentPageComponent } from "./demo/component.component";
import { DemoDividerPageComponent } from "./demo/divider.component";
import { DemoToastPageComponent } from "./demo/toast.component";
import { DemoRadioButtonPageComponent } from "./demo/radiobtn.component";
import { DemoRadioTogglePageComponent } from "./demo/radio-toggle.component";
import { DemoModalContainerComponent, DemoModalPageComponent } from "./demo/modal.component";
import { DemoPopoverPageComponent } from "./demo/popover.component";
import { DemoTagPageComponent } from "./demo/tag.component";
import { DemoTreePageComponent } from "./demo/tree.component";
import { NGXSeasonTreeModule } from "../components/tree/tree.module";
import { DemoArticlePageComponent } from "./demo/article.component";
import { DemoTabbedPageComponent } from "./demo/tabbed.component";
import { DemoStatusPageComponent } from "./demo/status.component";
import { DemoTablePageComponent } from "./demo/table.component";

@NgModule({
    declarations: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoComponentPageComponent,
        DemoAccordionPageComponent,
        DemoAlertPageComponent,
        DemoArticlePageComponent,
        DemoAvatarPageComponent,
        DemoBackgroundPageComponent,
        DemoBadgePageComponent,
        DemoBannerPageComponent,
        DemoBreadcrumbPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent,
        DemoCarouselPageComponent,
        DemoCheckboxPageComponent,
        DemoCheckSwitchPageComponent,
        DemoDigitalPageComponent,
        DemoDividerPageComponent,
        DemoIconPageComponent,
        DemoInputPageComponent,
        DemoListPageComponent,
        DemoModalPageComponent,
        DemoPopoverPageComponent,
        DemoProgressPageComponent,
        DemoRadioButtonPageComponent,
        DemoRadioTogglePageComponent,
        DemoRibbonPageComponent,
        DemoStatusPageComponent,
        DemoTabbedPageComponent,
        DemoTablePageComponent,
        DemoTagPageComponent,
        DemoToastPageComponent,
        DemoTooltipPageComponent,
        DemoTreePageComponent,

        DemoModalContainerComponent
    ],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NGXSeasonComponentsModule,
    NGXSeasonTreeModule
],
    exports: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoComponentPageComponent,
        DemoAccordionPageComponent,
        DemoAlertPageComponent,
        DemoArticlePageComponent,
        DemoAvatarPageComponent,
        DemoBackgroundPageComponent,
        DemoBadgePageComponent,
        DemoBannerPageComponent,
        DemoBreadcrumbPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent,
        DemoCarouselPageComponent,
        DemoCheckboxPageComponent,
        DemoCheckSwitchPageComponent,
        DemoDigitalPageComponent,
        DemoDividerPageComponent,
        DemoIconPageComponent,
        DemoInputPageComponent,
        DemoListPageComponent,
        DemoModalPageComponent,
        DemoPopoverPageComponent,
        DemoProgressPageComponent,
        DemoRadioButtonPageComponent,
        DemoRadioTogglePageComponent,
        DemoRibbonPageComponent,
        DemoStatusPageComponent,
        DemoTabbedPageComponent,
        DemoTablePageComponent,
        DemoTagPageComponent,
        DemoToastPageComponent,
        DemoTooltipPageComponent,
        DemoTreePageComponent
    ]
})
export class PageModule {}
