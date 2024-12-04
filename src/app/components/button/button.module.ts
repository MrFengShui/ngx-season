import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN, NGXSeasonIconButtonComponent, NGXSeasonLinkButtonComponent, NGXSeasonTextButtonComponent } from "./button.component";
import { NGXSeasonButtonGroupComponent } from "./button-group.componen";

@NgModule({
    declarations: [
        NGXSeasonButtonGroupComponent,
        NGXSeasonIconButtonComponent,
        NGXSeasonLinkButtonComponent,
        NGXSeasonTextButtonComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonButtonGroupComponent,
        NGXSeasonIconButtonComponent,
        NGXSeasonLinkButtonComponent,
        NGXSeasonTextButtonComponent
    ],
    providers: [
        { provide: NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, useValue: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4, xxxl: 4 } },
        { provide: NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN, useValue: { xs: 8, sm: 12, md: 16, lg: 24, xl: 36, xxl: 48, xxxl: 56 } }
    ]
})
export class NGXSeasonButtonModule {}
