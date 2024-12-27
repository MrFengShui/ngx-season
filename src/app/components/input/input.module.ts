import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from '../icon/icon.module';
import { NGXSeasonOverlayModule } from "../overlay/overlay.module";

import { NGX_SEASON_PASSWORD_CHECKER_LEVEL_TOKEN, NGXSeasonInputFieldComponent, NGXSeasonPasswordCheckerComponent } from "./input-field.component";
import { NGXSeasonInputPrefixDirective, NGXSeasonInputSuffixDirective } from "./input.component";

@NgModule({
    declarations: [
        NGXSeasonInputFieldComponent,
        NGXSeasonInputPrefixDirective,
        NGXSeasonInputSuffixDirective,
        NGXSeasonPasswordCheckerComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule,
        NGXSeasonOverlayModule
    ],
    exports: [
        NGXSeasonInputFieldComponent,
        NGXSeasonInputPrefixDirective,
        NGXSeasonInputSuffixDirective
    ],
    providers: [
        { provide: NGX_SEASON_PASSWORD_CHECKER_LEVEL_TOKEN, useValue: { weak: '较弱', medium: '中等', strong: '较强', stronger: '极强' } }
    ]
})
export class NGXSeasonInputModule {}
