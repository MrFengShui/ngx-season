import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonCarouselModule } from './carousel/carousel.module';
import { NGXSeasonButtonModule } from './button/button.module';
import { NGXSeasonIconModule } from './icon/icon.module';
import { NGXSeasonAccordionModule } from './accordion/accordion.module';
import { NGXSeasonAlertModule } from './alert/alert.module';
import { NGXSeasonCardModule } from './card/card.module';
import { NGXSeasonBadgeModule } from './badge/badge.module';
import { NGXSeasonLayoutModule } from './layout/layout.module';
import { NGXSeasonEffectsModule } from './effects/effects.module';
import { NGXSeasonRibbonModule } from './ribbon/ribbon.module';
import { NGXSeasonNavlistModule } from './navlist/navlist.module';
import { NGXSeasonProgressModule } from './progress/progress.module';
import { NGXSeasonDigitalModule } from './digital/digital.module';
import { NGXSeasonPlaceholderModule } from "./banner/banner.module";
import { NGXSeasonBreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { NGXSeasonListModule } from "./list/list.module";
import { NGXSeasonCheckModule } from "./check/check.module";
import { NGXSeasonInputModule } from "./input/input.module";
import { NGXSeasonOverlayModule } from "./overlay/overlay.module";
import { NGXSeasonDividerModule } from "./divider/divider.module";
import { NGXSeasonRadioModule } from "./radio/radio.module";
import { NGXSeasonModalModule } from "./modal/modal.module";
import { NGXSeasonCalendarModule } from "./calendar/calendar.module";
import { NGXSeasonTagModule } from "./tag/tag.module";
import { NGXSeasonArticleModule } from "./article/article.module";
import { NGXSeasonTabbedModule } from "./tabbed/tabbed.module";
import { NGXSeasonStatusModule } from "./status/status.module";
import { NGXSeasonTableModule } from "./table/table.module";
import { NGXSeasonPaginatorModule } from "./paginator/paginator.module";
import { NGXSeasonSelectModule } from "./select/select.module";
import { NGXSeasonSearchModule } from "./search/search.module";
import { NGXSeasonImageModule } from "./image/image.module";

@NgModule({
    imports: [
        CommonModule,

        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonArticleModule,
        NGXSeasonBadgeModule,
        NGXSeasonBreadcrumbModule,
        NGXSeasonButtonModule,
        NGXSeasonCalendarModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonCheckModule,
        NGXSeasonDigitalModule,
        NGXSeasonDividerModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonImageModule,
        NGXSeasonInputModule,
        NGXSeasonLayoutModule,
        NGXSeasonListModule,
        NGXSeasonModalModule,
        NGXSeasonNavlistModule,
        NGXSeasonOverlayModule,
        NGXSeasonPaginatorModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
        NGXSeasonRadioModule,
        NGXSeasonRibbonModule,
        NGXSeasonSearchModule,
        NGXSeasonSelectModule,
        NGXSeasonStatusModule,
        NGXSeasonTabbedModule,
        NGXSeasonTableModule,
        NGXSeasonTagModule,
    ],
    exports: [
        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonArticleModule,
        NGXSeasonBadgeModule,
        NGXSeasonBreadcrumbModule,
        NGXSeasonButtonModule,
        NGXSeasonCalendarModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonCheckModule,
        NGXSeasonDigitalModule,
        NGXSeasonDividerModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonImageModule,
        NGXSeasonInputModule,
        NGXSeasonLayoutModule,
        NGXSeasonListModule,
        NGXSeasonModalModule,
        NGXSeasonNavlistModule,
        NGXSeasonOverlayModule,
        NGXSeasonPaginatorModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
        NGXSeasonRadioModule,
        NGXSeasonRibbonModule,
        NGXSeasonSearchModule,
        NGXSeasonSelectModule,
        NGXSeasonStatusModule,
        NGXSeasonTabbedModule,
        NGXSeasonTableModule,
        NGXSeasonTagModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withJsonpSupport()),
        {
            provide: IMAGE_CONFIG,
            useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true }
        },
    ]
})
export class NGXSeasonComponentsModule { }
