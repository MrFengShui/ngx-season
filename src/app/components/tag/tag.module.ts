import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";
import { NGXSeasonButtonModule } from "../button/button.module";

import { NGXSeasonLinkTagComponent, NGXSeasonTagGroupComponent, NGXSeasonTextTagComponent } from "./tag.component";

@NgModule({
    declarations: [
        NGXSeasonTagGroupComponent,
        NGXSeasonTextTagComponent,
        NGXSeasonLinkTagComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonAvatarModule,
        NGXSeasonButtonModule
    ],
    exports: [
        NGXSeasonTagGroupComponent,
        NGXSeasonTextTagComponent,
        NGXSeasonLinkTagComponent
    ]
})
export class NGXSeasonTagModule {}
