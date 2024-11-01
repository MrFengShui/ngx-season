import { PortalModule } from "@angular/cdk/portal";
import { CdkAccordionModule } from "@angular/cdk/accordion";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonAccordionPanelComponent } from "./accordion-panel.component";
import { NGXSeasonAccordionPanelContentComponent, NGXSeasonAccordionPanelContentDirective, NGXSeasonAccordionPanelFooterComponent, NGXSeasonAccordionPanelFooterDirective, NGXSeasonAccordionPanelHeaderComponent } from "./accordion-widget.component";

import { NGXSeasonUniqueSelectionIDDispatcher } from "src/app/utils/services/switch-select.service";

@NgModule({
    declarations: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionPanelComponent,
        NGXSeasonAccordionPanelHeaderComponent,
        NGXSeasonAccordionPanelContentComponent,
        NGXSeasonAccordionPanelFooterComponent,
        NGXSeasonAccordionPanelContentDirective,
        NGXSeasonAccordionPanelFooterDirective
    ],
    imports: [
        CommonModule,
        PortalModule,
        CdkAccordionModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule,
    ],
    exports: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionPanelComponent,
        NGXSeasonAccordionPanelContentDirective,
        NGXSeasonAccordionPanelFooterDirective
    ],
    providers: [ NGXSeasonUniqueSelectionIDDispatcher ]
})
export class NGXSeasonAccordionModule {}