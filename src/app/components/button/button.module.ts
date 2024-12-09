import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, NGXSeasonIconButtonComponent, NGXSeasonLinkButtonComponent, NGXSeasonTextButtonComponent } from "./button.component";
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
        { provide: NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, useValue: { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3, xxxl: 4, xxxxl: 4 } }
    ]
})
export class NGXSeasonButtonModule {}
