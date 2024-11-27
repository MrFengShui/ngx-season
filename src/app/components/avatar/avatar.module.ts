import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, NGXSeasonAvatarComponent } from "./avatar.component";

@NgModule({
    declarations: [ NGXSeasonAvatarComponent ],
    imports: [ CommonModule ],
    exports: [ NGXSeasonAvatarComponent ],
    providers: [
        { provide: NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, useValue: { xs: 8, sm: 16, md: 24, lg: 36, xl: 48, xxl: 56, xxxl: 64 } }
    ]
})
export class NGXSeasonAvatarModule {}
