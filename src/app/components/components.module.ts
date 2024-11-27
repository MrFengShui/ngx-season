import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonCarouselModule } from './carousel/carousel.module';
import { NGXSeasonButtonModule } from './button/button.module';
import { NGXSeasonIconModule } from './icon/icon.module';
import { NGXSeasonAccordionModule } from './accordion/accordion.module';
import { NGXSeasonAlertModule } from './alert/alert.module';
import { NGXSeasonCardModule } from './card/card.module';
import { NGXSeasonAvatarModule } from './avatar/avatar.module';
import { NGXSeasonBadgeModule } from './badge/badge.module';
import { NGXSeasonLayoutModule } from './layout/layout.module';
import { NGXSeasonEffectsModule } from './effects/effects.module';
import { NGXSeasonRibbonModule } from './ribbon/ribbon.module';
import { NGXSeasonNavlistModule } from './navlist/navlist.module';
import { NGXSeasonProgressModule } from './progress/progress.module';
import { NGXSeasonDigitalModule } from './digital/digital.module';
import { NGXSeasonPlaceholderModule } from "./placeholder/placeholder.module";
import { NGXSeasonBreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { NGXSeasonListModule } from "./list/list.module";
import { NGXSeasonCheckModule } from "./check/check.module";
import { NGXSeasonInputModule } from "./input/input.module";
import { NGXSeasonOverlayModule } from "./overlay/overlay.module";
import { NGXSeasonDividerModule } from "./divider/divider.module";
import { NGXSeasonRadioModule } from "./radio/radio.module";
import { NGXSeasonModalModule } from "./modal/modal.module";
import { NGXSeasonCalendarModule } from "./calendar/calendar.module";

@NgModule({
    imports: [
        CommonModule,

        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
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
        NGXSeasonInputModule,
        NGXSeasonLayoutModule,
        NGXSeasonListModule,
        NGXSeasonModalModule,
        NGXSeasonNavlistModule,
        NGXSeasonOverlayModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
        NGXSeasonRadioModule,
        NGXSeasonRibbonModule
    ],
    exports: [
        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
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
        NGXSeasonInputModule,
        NGXSeasonLayoutModule,
        NGXSeasonListModule,
        NGXSeasonModalModule,
        NGXSeasonNavlistModule,
        NGXSeasonOverlayModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
        NGXSeasonRadioModule,
        NGXSeasonRibbonModule,
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
