import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";
import { NGXSeasonButtonModule } from "../button/button.module";

import { NGXSeasonTagComponent } from "./tag.component";
import { NGXSeasonTagGridComponent } from "./tag-grid.component";

@NgModule({
    declarations: [
        NGXSeasonTagGridComponent,
        NGXSeasonTagComponent
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonAvatarModule,
        NGXSeasonButtonModule
    ],
    exports: [
        NGXSeasonTagGridComponent,
        NGXSeasonTagComponent
    ]
})
export class NGXSeasonTagModule {}
