import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonCheckModule } from "../check/check.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonTreeComponent, NGXSeasonTreeNodeComponent } from "./tree.component";

@NgModule({
    declarations: [
        NGXSeasonTreeComponent,
        NGXSeasonTreeNodeComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonButtonModule,
        NGXSeasonCheckModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonTreeComponent
    ]
})
export class NGXSeasonTreeModule {}
