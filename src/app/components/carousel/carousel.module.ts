import { PortalModule } from "@angular/cdk/portal";
import { DEFAULT_SCROLL_TIME, ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonProgressModule } from "../progress/progress.module";

import { NGXSeasonCarouselComponent, NGXSeasonCarouselOrbitComponent } from "./carousel.component";
import { NGXSeasonCarouselPanelDirective, NGXSeasonCarouselPanelTemplateDirective } from "./carousel.directive";
import { NGXSeasonWhileDirective } from "src/app/utils/directives/while.directive";

@NgModule({
    declarations: [
        NGXSeasonCarouselComponent,
        NGXSeasonCarouselOrbitComponent,
        NGXSeasonCarouselPanelDirective,
        NGXSeasonCarouselPanelTemplateDirective,
        NGXSeasonWhileDirective
    ],
    imports: [
        CommonModule,
        PortalModule,
        ScrollingModule,

        NGXSeasonButtonModule,
        NGXSeasonProgressModule
    ],
    exports: [
        NGXSeasonCarouselComponent,
        NGXSeasonCarouselPanelDirective,
        NGXSeasonCarouselPanelTemplateDirective
    ],
    providers: [{ provide: DEFAULT_SCROLL_TIME, useValue: 5000 }]
})
export class NGXSeasonCarouselModule {}
