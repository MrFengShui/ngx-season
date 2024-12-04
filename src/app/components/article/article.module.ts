import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonArticleHeadingDirective, NGXSeasonArticleHeadlineDirective, NGXSeasonArticleParaGraphDirective, NGXSeasonArticleSubheadingDirective, NGXSeasonArticleSubtitleDirective, NGXSeasonArticleTitleDirective } from "./article.directive";
import { NGXSeasonArticleComponent, NGXSeasonArticleFigureComponent, NGXSeasonArticleFigureGroupComponent, NGXSeasonArticleReferenceComponent } from "./article.component";

@NgModule({
    declarations: [
        NGXSeasonArticleComponent,
        NGXSeasonArticleFigureGroupComponent,
        NGXSeasonArticleFigureComponent,
        NGXSeasonArticleReferenceComponent,
        NGXSeasonArticleHeadlineDirective,
        NGXSeasonArticleTitleDirective,
        NGXSeasonArticleSubtitleDirective,
        NGXSeasonArticleHeadingDirective,
        NGXSeasonArticleSubheadingDirective,
        NGXSeasonArticleParaGraphDirective
    ],
    imports: [
        CommonModule,

        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonArticleComponent,
        NGXSeasonArticleFigureGroupComponent,
        NGXSeasonArticleFigureComponent,
        NGXSeasonArticleReferenceComponent,
        NGXSeasonArticleHeadlineDirective,
        NGXSeasonArticleTitleDirective,
        NGXSeasonArticleSubtitleDirective,
        NGXSeasonArticleHeadingDirective,
        NGXSeasonArticleSubheadingDirective,
        NGXSeasonArticleParaGraphDirective
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()), provideHttpClient(withJsonpSupport())
    ]
})
export class NGXSeasonArticleModule {}
