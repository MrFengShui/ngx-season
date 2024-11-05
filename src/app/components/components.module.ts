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
import { NGXSeasonNavigatorModule } from './navigator/navigator.module';
import { NGXSeasonProgressModule } from './progress/progress.module';
import { NGXSeasonDigitalModule } from './digital/digital.module';
import { NGXSeasonPlaceholderModule } from "./placeholder/placeholder.module";
import { NGXSeasonBreadcrumbModule } from "./breadcrumb/breadcrumb.module";

@NgModule({
    imports: [
        CommonModule,

        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
        NGXSeasonBadgeModule,
        NGXSeasonBreadcrumbModule,
        NGXSeasonButtonModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonDigitalModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonLayoutModule,
        NGXSeasonNavigatorModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
        NGXSeasonRibbonModule
    ],
    exports: [
        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
        NGXSeasonBadgeModule,
        NGXSeasonBreadcrumbModule,
        NGXSeasonButtonModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonDigitalModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonLayoutModule,
        NGXSeasonNavigatorModule,
        NGXSeasonPlaceholderModule,
        NGXSeasonProgressModule,
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