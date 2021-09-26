import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusDividerModule } from 'src/app/components/divider/divider.module';
import { OctopusIconModule } from 'src/app/components/icon/icon.module';
import { OctopusRippleModule } from 'src/app/components/ripple/ripple.module';

import { OctopusExpansion, OctopusExpansionPanel, OctopusExpansionPanelContent, OctopusExpansionPanelAddon } from './expansion.component';

@NgModule({
    declarations: [
        OctopusExpansion,
        OctopusExpansionPanel,
        OctopusExpansionPanelContent,
        OctopusExpansionPanelAddon
    ],
    imports: [
        CommonModule,
        PortalModule,
        CdkAccordionModule,
        OctopusDividerModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusExpansion,
        OctopusExpansionPanel,
        OctopusExpansionPanelContent,
        OctopusExpansionPanelAddon
    ]
})
export class OctopusExpansionModule { }