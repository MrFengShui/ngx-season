import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGX_SEASON_BANNER_SPEED_MAP_TOKEN, NGX_SEASON_MEDIA_BANNER_TYPE_MAP_TOKEN, NGXSeasonMediaBannerComponent, NGXSeasonParagraphBannerComponent, NGXSeasonMetainfoBannerComponent } from "./banner.component";

@NgModule({
    declarations: [
        NGXSeasonMediaBannerComponent,
        NGXSeasonParagraphBannerComponent,
        NGXSeasonMetainfoBannerComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonMediaBannerComponent,
        NGXSeasonParagraphBannerComponent,
        NGXSeasonMetainfoBannerComponent
    ],
    providers: [
        {
            provide: NGX_SEASON_MEDIA_BANNER_TYPE_MAP_TOKEN,
            useValue: { image: 'image', audio: 'music-note', video: 'film-strip' }
        },
        {
            provide: NGX_SEASON_BANNER_SPEED_MAP_TOKEN,
            useValue: { xs: 5000, sl: 3750, md: 2500, fa: 1750, xf: 1000 }
        }
    ]
})
export class NGXSeasonPlaceholderModule {}
