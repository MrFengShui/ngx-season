import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, NGXSeasonImageAvatarDirective, NGXSeasonImageFigureDirective } from "./image.directive";

@NgModule({
    declarations: [
        NGXSeasonImageFigureDirective,
        NGXSeasonImageAvatarDirective
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonImageFigureDirective,
        NGXSeasonImageAvatarDirective
    ],
    providers: [{
        provide: NGX_SEASON_AVATAR_SIZE_MAP_TOKEN,
        useValue: { xs: 12, sm: 24, md: 36, lg: 48, xl: 64, xxl: 84, xxxl: 96, xxxxl: 128 }
    }]
})
export class NGXSeasonImageModule {}
