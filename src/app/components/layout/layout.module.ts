import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonEffectsModule } from "../effects/effects.module";

import { NGXSeasonLayoutContentAreaDirective, NGXSeasonLayoutContentComponent, NGXSeasonLayoutContentSideDirective } from "./layout-content.component";
import { NGXSeasonLayoutFooterComponent } from "./layout-footer.component";
import { NGXSeasonLayoutHeaderActionsDirective, NGXSeasonLayoutHeaderComponent, NGXSeasonLayoutHeaderContentDirective } from "./layout-header.component";
import { NGXSeasonLayoutComponent } from "./layout.component";
import { NGXSeasonGridLayoutDirective } from "./layout.directive";

@NgModule({
    declarations: [
        NGXSeasonLayoutComponent,
        NGXSeasonLayoutHeaderComponent,
        NGXSeasonLayoutHeaderContentDirective,
        NGXSeasonLayoutHeaderActionsDirective,
        NGXSeasonLayoutFooterComponent,
        NGXSeasonLayoutContentComponent,
        NGXSeasonLayoutContentSideDirective,
        NGXSeasonLayoutContentAreaDirective,
        NGXSeasonGridLayoutDirective
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonEffectsModule
    ],
    exports: [
        NGXSeasonLayoutComponent,
        NGXSeasonLayoutHeaderComponent,
        NGXSeasonLayoutHeaderContentDirective,
        NGXSeasonLayoutHeaderActionsDirective,
        NGXSeasonLayoutFooterComponent,
        NGXSeasonLayoutContentComponent,
        NGXSeasonLayoutContentSideDirective,
        NGXSeasonLayoutContentAreaDirective,
        NGXSeasonGridLayoutDirective
    ]
})
export class NGXSeasonLayoutModule {}
