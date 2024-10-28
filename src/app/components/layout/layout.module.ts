import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonEffectsModule } from "../effects/effects.module";

import { NGXSeasonLayoutContentComponent } from "./layout-content.component";
import { NGXSeasonLayoutFooterComponent } from "./layout-footer.component";
import { NGXSeasonLayoutHeaderComponent } from "./layout-header.component";
import { NGXSeasonLayoutComponent } from "./layout.component";

@NgModule({
    declarations: [
        NGXSeasonLayoutComponent,
        NGXSeasonLayoutHeaderComponent,
        NGXSeasonLayoutFooterComponent,
        NGXSeasonLayoutContentComponent,
    ],
    imports: [
        CommonModule,
        NGXSeasonButtonModule,
        NGXSeasonEffectsModule
    ],
    exports: [
        NGXSeasonLayoutComponent,
        NGXSeasonLayoutHeaderComponent,
        NGXSeasonLayoutFooterComponent,
        NGXSeasonLayoutContentComponent,
    ]
})
export class NGXSeasonLayoutModule {}