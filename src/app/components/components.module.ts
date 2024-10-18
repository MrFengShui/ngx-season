import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonButtonComponent, NGXSeasonFlatButtonComponent, NGXSeasonFlatIconButtonComponent, NGXSeasonIconButtonComponent, NGXSeasonLinkButtonComponent, NGXSeasonLinkIconButtonComponent, NGXSeasonOutlineButtonComponent, NGXSeasonOutlineIconButtonComponent } from "./button.component";
import { NGXSeasonContentComponent, NGXSeasonFooterComponent, NGXSeasonHeaderComponent, NGXSeasonLayoutComponent } from "./layout.component";
import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { NGXSeasonNavlistComponent, NGXSeasonNavlinkComponent } from "./navigator.component";
import { NGXSeasonScrollbarDirective } from "./scrollbar.directive";
import { NGXSeasonAdvancedAlertComponent, NGXSeasonAlertComponent } from "./alert.component";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('moon').addIcon('sun')
                .addIcon('check').addIcon('times').addIcon('check-circle').addIcon('times-circle').addIcon('shield-check').addIcon('shield-times')
                .addIcon('avatar').addIcon('administrator').addIcon('assign-user').addIcon('user').addIcon('users')
                .addIcon('applications').addIcon('bars').addIcon('close')
                .addIcon('success').addIcon('success-standard').addIcon('warning').addIcon('warning-standard').addIcon('failure').addIcon('failure-standard').addIcon('info').addIcon('info-standard');

@NgModule({
    declarations: [
        NGXSeasonAlertComponent,
        NGXSeasonAdvancedAlertComponent,
        NGXSeasonButtonComponent,
        NGXSeasonIconButtonComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonOutlineIconButtonComponent,
        NGXSeasonFlatButtonComponent,
        NGXSeasonFlatIconButtonComponent,
        NGXSeasonLinkButtonComponent,
        NGXSeasonLinkIconButtonComponent,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent,
        NGXSeasonNavlistComponent,
        NGXSeasonNavlinkComponent,
        NGXSeasonScrollbarDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NGXSeasonAlertComponent,
        NGXSeasonAdvancedAlertComponent,
        NGXSeasonButtonComponent,
        NGXSeasonIconButtonComponent,
        NGXSeasonOutlineButtonComponent,
        NGXSeasonOutlineIconButtonComponent,
        NGXSeasonFlatButtonComponent,
        NGXSeasonFlatIconButtonComponent,
        NGXSeasonLinkButtonComponent,
        NGXSeasonLinkIconButtonComponent,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent,
        NGXSeasonNavlistComponent,
        NGXSeasonNavlinkComponent,
        NGXSeasonScrollbarDirective
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withJsonpSupport()),
        {
            provide: IMAGE_CONFIG,
            useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true }
        },
        { provide: NGX_SEASON_ICONS_REGISTER_TOKEN, useValue: register },
        { provide: NGX_SEASON_ICONS_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 24, lg: 36, xl: 48 } }
    ]
})
export class NGXSeasonComponentsModule { }