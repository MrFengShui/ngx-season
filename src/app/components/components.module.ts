import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonButtonComponent, NGXSeasonSolidButtonComponent, NGXSeasonOutlineButtonComponent } from "./button/button.component";
import { NGXSeasonContentComponent, NGXSeasonFooterComponent, NGXSeasonHeaderComponent, NGXSeasonLayoutComponent } from "./layout.component";
import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { NGXSeasonNavlistComponent, NGXSeasonNavlinkComponent, NGXSeasonNavblockComponent } from "./navigator.component";
import { NGXSeasonScrollbarDirective } from "./scrollbar.directive";
import { NGXSeasonAdvancedAlertComponent, NGXSeasonAlertComponent, NGXSeasonOutlineAlertComponent, NGXSeasonSolidAlertComponent } from "./alert/alert.component";
import { NGXSeasonRippleDirective } from "./ripple.directive";
import { RouterModule } from "@angular/router";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('moon').addIcon('sun')
                .addIcon('check').addIcon('times').addIcon('check-circle').addIcon('times-circle').addIcon('shield-check').addIcon('shield-times')
                .addIcon('avatar').addIcon('administrator').addIcon('assign-user').addIcon('user').addIcon('users')
                .addIcon('applications').addIcon('bars').addIcon('close').addIcon('angle').addIcon('angle-double')
                .addIcon('success').addIcon('success-standard').addIcon('warning').addIcon('warning-standard').addIcon('failure').addIcon('failure-standard').addIcon('info').addIcon('info-standard');

@NgModule({
    declarations: [
        NGXSeasonAlertComponent,
        NGXSeasonSolidAlertComponent,
        NGXSeasonOutlineAlertComponent,
        NGXSeasonAdvancedAlertComponent,
        NGXSeasonButtonComponent,
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
        RouterModule
    ],
    exports: [
        NGXSeasonAlertComponent,
        NGXSeasonSolidAlertComponent,
        NGXSeasonOutlineAlertComponent,
        NGXSeasonAdvancedAlertComponent,
        NGXSeasonButtonComponent,
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
        { provide: NGX_SEASON_ICONS_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 24, lg: 32, xl: 40, xxl: 48, xxxl: 56 } }
    ]
})
export class NGXSeasonComponentsModule { }