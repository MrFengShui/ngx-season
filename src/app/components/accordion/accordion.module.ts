import { PortalModule } from "@angular/cdk/portal";
import { CdkAccordionModule } from "@angular/cdk/accordion";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";

import { NGXSeasonAccordionComponent } from "./accordion.component";
import { NGXSeasonAccordionBlockComponent, NGXSeasonAccordionBlockHeaderDirective, NGXSeasonAccordionBlockContentDirective } from "./accordion-block.component";

@NgModule({
    declarations: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionBlockComponent,
        NGXSeasonAccordionBlockHeaderDirective,
        NGXSeasonAccordionBlockContentDirective,
    ],
    imports: [ 
        CommonModule,
        PortalModule,
        CdkAccordionModule,

        NGXSeasonButtonModule
    ],
    exports: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionBlockComponent,
        NGXSeasonAccordionBlockHeaderDirective,
        NGXSeasonAccordionBlockContentDirective,
    ]
})
export class NGXSeasonAccordionModule {}