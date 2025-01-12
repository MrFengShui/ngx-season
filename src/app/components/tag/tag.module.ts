import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonImageModule } from "../image/image.module";

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

        NGXSeasonButtonModule,
        NGXSeasonImageModule
    ],
    exports: [
        NGXSeasonTagGridComponent,
        NGXSeasonTagComponent
    ]
})
export class NGXSeasonTagModule {}
