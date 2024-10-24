import { CdkAccordionModule } from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';
import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonButtonComponent, NGXSeasonSolidButtonComponent, NGXSeasonOutlineButtonComponent } from "./button/button.component";
import { NGXSeasonContentComponent, NGXSeasonFooterComponent, NGXSeasonHeaderComponent, NGXSeasonLayoutComponent } from "./layout.component";
import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { NGXSeasonNavlistComponent, NGXSeasonNavlinkComponent, NGXSeasonNavblockComponent } from "./navigator.component";
import { NGXSeasonScrollbarDirective } from "./scrollbar.directive";
import { NGXSeasonTipAlertComponent, NGXSeasonAlertComponent } from "./alert.component";
import { NGXSeasonRippleDirective } from "./ripple.directive";
import { NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, NGXSeasonAvatarComponent } from "./avatar.component";
import { NGXSeasonCardComponent, NGXSeasonCardContentComponent, NGXSeasonCardFooterDirective, NGXSeasonCardMediaBlockComponent, NGXSeasonCardHeaderDirective, NGXSeasonCardImageDirective, NGXSeasonCardHeaderComponent, NGXSeasonCardFooterComponent, NGXSeasonCardActionBlockComponent } from "./card.component";
import { NGXSeasonAccordionBlockComponent, NGXSeasonAccordionBlockContentDirective, NGXSeasonAccordionBlockHeaderDirective, NGXSeasonAccordionComponent } from './accordion.component';

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('moon').addIcon('sun').addIcon('thumbs-up').addIcon('thumbs-down')
                .addIcon('check').addIcon('plus').addIcon('plus-circle').addIcon('minus').addIcon('minus-circle').addIcon('times').addIcon('times-circle').addIcon('shield-check').addIcon('shield-times')
                .addIcon('avatar').addIcon('administrator').addIcon('assign-user').addIcon('user').addIcon('users')
                .addIcon('applications').addIcon('bars').addIcon('close').addIcon('angle').addIcon('angle-double').addIcon('star').addIcon('bookmark').addIcon('favorite').addIcon('share')
                .addIcon('success').addIcon('success-standard').addIcon('warning').addIcon('warning-standard').addIcon('failure').addIcon('failure-standard').addIcon('info').addIcon('info-standard');

@NgModule({
    declarations: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionBlockComponent,
        NGXSeasonAccordionBlockHeaderDirective,
        NGXSeasonAccordionBlockContentDirective,
        NGXSeasonAlertComponent,
        NGXSeasonAvatarComponent,
        NGXSeasonTipAlertComponent,
        NGXSeasonButtonComponent,
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardActionBlockComponent,
        NGXSeasonCardMediaBlockComponent,
        NGXSeasonCardImageDirective,
        NGXSeasonCardHeaderDirective,
        NGXSeasonCardFooterDirective,
        NGXSeasonCardContentComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonSolidButtonComponent,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent,
        NGXSeasonNavlistComponent,
        NGXSeasonNavblockComponent,
        NGXSeasonNavlinkComponent,
        NGXSeasonScrollbarDirective,
        NGXSeasonRippleDirective
    ],
    imports: [
        CommonModule,
        CdkAccordionModule,
        PortalModule
    ],
    exports: [
        NGXSeasonAccordionComponent,
        NGXSeasonAccordionBlockComponent,
        NGXSeasonAccordionBlockHeaderDirective,
        NGXSeasonAccordionBlockContentDirective,
        NGXSeasonAlertComponent,
        NGXSeasonAvatarComponent,
        NGXSeasonTipAlertComponent,
        NGXSeasonButtonComponent,
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardActionBlockComponent,
        NGXSeasonCardMediaBlockComponent,
        NGXSeasonCardImageDirective,
        NGXSeasonCardHeaderDirective,
        NGXSeasonCardFooterDirective,
        NGXSeasonCardContentComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonSolidButtonComponent,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent,
        NGXSeasonNavlistComponent,
        NGXSeasonNavblockComponent,
        NGXSeasonNavlinkComponent,
        NGXSeasonScrollbarDirective,
        NGXSeasonRippleDirective
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withJsonpSupport()),
        {
            provide: IMAGE_CONFIG,
            useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true }
        },
        { provide: NGX_SEASON_ICONS_REGISTER_TOKEN, useValue: register },
        { provide: NGX_SEASON_ICONS_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 24, lg: 32, xl: 40, xxl: 48, xxxl: 56 } },
        { provide: NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 32, lg: 48, xl: 56, xxl: 64, xxxl: 72 } },
    ]
})
export class NGXSeasonComponentsModule { }