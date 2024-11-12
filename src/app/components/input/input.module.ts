import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from '../icon/icon.module';
import { NGXSeasonOverlayModule } from "../overlay/overlay.module";

import { NGXSeasonTextfieldComponent } from "./textfield.component";
import { NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN, NGXSeasonPasswordComponent, NGXSeasonPasswordStrengthCheckComponent } from "./password.component";
import { NGXSeasonInputPrefixDirective, NGXSeasonInputSuffixDirective } from "./input.component";
import { NGXSeasonSearchComponent } from './search.component';

@NgModule({
    declarations: [
        NGXSeasonPasswordStrengthCheckComponent,
        NGXSeasonSearchComponent,
        NGXSeasonTextfieldComponent,
        NGXSeasonPasswordComponent,
        NGXSeasonInputPrefixDirective,
        NGXSeasonInputSuffixDirective
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule,
        NGXSeasonOverlayModule
    ],
    exports: [
        NGXSeasonSearchComponent,
        NGXSeasonTextfieldComponent,
        NGXSeasonPasswordComponent,
        NGXSeasonInputPrefixDirective,
        NGXSeasonInputSuffixDirective
    ],
    providers: [
        { provide: NGX_SEASON_PASSWORD_STRENGTH_LABEL_TOKEN, useValue: { weak: '弱', medium: '中', strong: '强', extra: '非常强' } }
    ]
})
export class NGXSeasonInputModule {}