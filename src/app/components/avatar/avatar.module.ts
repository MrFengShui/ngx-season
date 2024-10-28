import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, NGXSeasonAvatarComponent } from "./avatar.component";

@NgModule({
    declarations: [ NGXSeasonAvatarComponent ],
    imports: [ CommonModule ],
    exports: [ NGXSeasonAvatarComponent ],
    providers: [ 
        { provide: NGX_SEASON_AVATAR_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 32, lg: 48, xl: 56, xxl: 64, xxxl: 72 } } 
    ]
})
export class NGXSeasonAvatarModule {}