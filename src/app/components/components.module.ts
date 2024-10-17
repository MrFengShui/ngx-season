import { NgModule } from "@angular/core";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from "@angular/common/http";

import { NGXSeasonButtonDirective, NGXSeasonFlatButtonDirective, NGXSeasonLinkButtonDirective, NGXSeasonOutlineButtonDirective } from "./button.directive";
import { NGXSeasonContentComponent, NGXSeasonFooterComponent, NGXSeasonHeaderComponent, NGXSeasonLayoutComponent } from "./layout.component";
import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('moon').addIcon('sun');

@NgModule({
    declarations: [
        NGXSeasonButtonDirective,
        NGXSeasonOutlineButtonDirective,
        NGXSeasonFlatButtonDirective,
        NGXSeasonLinkButtonDirective,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NGXSeasonButtonDirective,
        NGXSeasonOutlineButtonDirective,
        NGXSeasonFlatButtonDirective,
        NGXSeasonLinkButtonDirective,
        NGXSeasonIconComponent,
        NGXSeasonLayoutComponent,
        NGXSeasonHeaderComponent,
        NGXSeasonFooterComponent,
        NGXSeasonContentComponent
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