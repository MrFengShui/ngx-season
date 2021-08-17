import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusExpansion } from './expansion.component';
import { OctopusExpansionPanel } from './panel.component';
import { OctopusExpansionAction } from './widget.component';

@NgModule({
    declarations: [
        OctopusExpansion,
        OctopusExpansionPanel,
        OctopusExpansionAction
    ],
    imports: [
        CommonModule,
        CdkAccordionModule
    ],
    exports: [
        OctopusExpansion,
        OctopusExpansionPanel,
        OctopusExpansionAction
    ]
})
export class OctopusExpansionModule { }