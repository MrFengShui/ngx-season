import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NGXSeasonRippleDirective } from "./ripple.directive";
import { NGXSeasonScrollbarDirective } from "./scrollbar.directive";
import { NGX_SEASON_BACKGROUND_PATTERN_SIZE_MAP_TOKEN, NGX_SEASON_BACKGROUND_STRIPE_SIZE_MAP_TOKEN, NGX_SEASON_BACKGROUND_STRIPE_SPEED_MAP_TOKEN, NGXSeasonPatternBackgroudnDirective, NGXSeasonStripeBackgroudnDirective } from "./background.directive";

@NgModule({
    declarations: [
        NGXSeasonPatternBackgroudnDirective,
        NGXSeasonStripeBackgroudnDirective,
        NGXSeasonRippleDirective,
        NGXSeasonScrollbarDirective
    ],
    imports: [ CommonModule ],
    exports: [
        NGXSeasonPatternBackgroudnDirective,
        NGXSeasonStripeBackgroudnDirective,
        NGXSeasonRippleDirective,
        NGXSeasonScrollbarDirective
    ],
    providers: [
        { 
            provide: NGX_SEASON_BACKGROUND_PATTERN_SIZE_MAP_TOKEN, 
            useValue: { sm: 16, md: 24, lg: 36, xl: 48, xxl: 56, xxxl: 64 } 
        },
        { 
            provide: NGX_SEASON_BACKGROUND_STRIPE_SIZE_MAP_TOKEN, 
            useValue: { sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, xxxl: 32 } 
        },
        { 
            provide: NGX_SEASON_BACKGROUND_STRIPE_SPEED_MAP_TOKEN, 
            useValue: { xs: 2000, sl: 1500, md: 1000, fs: 500, xf: 250 } 
        }
    ]
})
export class NGXSeasonEffectsModule {}