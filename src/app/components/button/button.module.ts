import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonSolidTextButtonComponent } from './text-btn.component';
import { NGXSeasonOutlineTextButtonComponent } from './text-btn.component';
import { NGXSeasonFlatTextButtonComponent } from './text-btn.component';
import { NGXSeasonSolidIconButtonComponent } from './icon-btn.component';
import { NGXSeasonOutlineIconButtonComponent } from './icon-btn.component';
import { NGXSeasonFlatIconButtonComponent } from './icon-btn.component';
import { NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN } from "./button.component";

@NgModule({
    declarations: [
        NGXSeasonFlatIconButtonComponent,
        NGXSeasonOutlineIconButtonComponent,
        NGXSeasonSolidIconButtonComponent,
        NGXSeasonFlatTextButtonComponent,
        NGXSeasonOutlineTextButtonComponent,
        NGXSeasonSolidTextButtonComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonFlatIconButtonComponent,
        NGXSeasonOutlineIconButtonComponent,
        NGXSeasonSolidIconButtonComponent,
        NGXSeasonFlatTextButtonComponent,
        NGXSeasonOutlineTextButtonComponent,
        NGXSeasonSolidTextButtonComponent
    ],
    providers: [
        { provide: NGX_SEASON_BUTTON_BORDER_SIZE_MAP_TOKEN, useValue: { sm: 1, md: 1, lg: 2, xl: 2, xxl: 3, xxxl: 4 } },
        { provide: NGX_SEASON_BUTTON_FONT_SIZE_MAP_TOKEN, useValue: { sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } }
    ]
})
export class NGXSeasonButtonModule {}
