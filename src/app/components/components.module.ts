import { CdkAccordionModule } from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';
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

@NgModule({
    imports: [
        CommonModule,
        CdkAccordionModule,
        PortalModule,

        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
        NGXSeasonBadgeModule,
        NGXSeasonButtonModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonLayoutModule,
        NGXSeasonNavigatorModule,
        NGXSeasonProgressModule,
        NGXSeasonRibbonModule
    ],
    exports: [
        NGXSeasonAccordionModule,
        NGXSeasonAlertModule,
        NGXSeasonAvatarModule,
        NGXSeasonBadgeModule,
        NGXSeasonButtonModule,
        NGXSeasonCardModule,
        NGXSeasonCarouselModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule,
        NGXSeasonLayoutModule,
        NGXSeasonNavigatorModule,
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