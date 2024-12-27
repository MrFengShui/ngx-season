import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";
import { NGXSeasonTagModule } from "../tag/tag.module";

import { NGXSeasonSearchComponent } from "./search.component";
import { NGXSeasonSearchHistoryComponent } from "./search-history.component";
import { NGXSeasonSearchRecommendComponent } from "./search-recommend.component";
import { NGXSeasonSearchFieldAddonDirective } from "./search.directive";

@NgModule({
    declarations: [
        NGXSeasonSearchComponent,
        NGXSeasonSearchHistoryComponent,
        NGXSeasonSearchRecommendComponent,
        NGXSeasonSearchFieldAddonDirective
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule,
        NGXSeasonTagModule
    ],
    exports: [
        NGXSeasonSearchComponent,
        NGXSeasonSearchHistoryComponent,
        NGXSeasonSearchRecommendComponent,
        NGXSeasonSearchFieldAddonDirective
    ]
})
export class NGXSeasonSearchModule {}
