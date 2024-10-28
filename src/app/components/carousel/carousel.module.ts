import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";

import { NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN, NGXSeasonCarouselContentComponent } from "./carousel-content.component";
import { NGXSeasonCarouselComponent, NGXSeasonCarouselItemComponent } from "./carousel.component";
import { NGXSeasonCarouselControlComponent, NGXSeasonCarouselControlItemComponent } from "./carousel-control.component";

@NgModule({
    declarations: [
        NGXSeasonCarouselComponent,
        NGXSeasonCarouselItemComponent,
        NGXSeasonCarouselContentComponent,
        NGXSeasonCarouselControlComponent,
        NGXSeasonCarouselControlItemComponent,
    ],
    imports: [ 
        CommonModule,
        NGXSeasonButtonModule
    ],
    exports: [
        NGXSeasonCarouselComponent,
        NGXSeasonCarouselItemComponent
    ],
    providers: [
        { provide: NGX_SEASON_CAROUSEL_METAINFO_FORMAT_TOKEN, useValue: '第${index}页，共${total}页' }
    ]
})
export class NGXSeasonCarouselModule {}