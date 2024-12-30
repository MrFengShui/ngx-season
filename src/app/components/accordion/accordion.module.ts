import { PortalModule } from "@angular/cdk/portal";
import { CdkAccordionModule } from "@angular/cdk/accordion";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonAccordionSelectionService } from "./accordion.service";

import { NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonAccordionPanelComponent } from "./accordion-panel.component";
import { NGXSeasonAccordionPanelHeaderComponent, NGXSeasonAccordionPanelContentComponent, NGXSeasonAccordionPanelFooterComponent } from "./accordion-widget.component";

@NgModule({
    declarations: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionPanelComponent,
        NGXSeasonAccordionPanelHeaderComponent,
        NGXSeasonAccordionPanelContentComponent,
        NGXSeasonAccordionPanelFooterComponent
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
        NGXSeasonAccordionPanelHeaderComponent,
        NGXSeasonAccordionPanelContentComponent,
        NGXSeasonAccordionPanelFooterComponent
    ],
    providers: [ NGXSeasonAccordionSelectionService ]
})
export class NGXSeasonAccordionModule {}
