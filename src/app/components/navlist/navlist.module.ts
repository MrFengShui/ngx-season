import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonNavlistSectionComponent } from "./nav-sec.component";
import { NGXSeasonNavlistComponent } from "./nav-list.component";
import { NGXSeasonNavlistItemComponent } from "./nav-item.component";

@NgModule({
    declarations: [
        NGXSeasonNavlistComponent,
        NGXSeasonNavlistSectionComponent,
        NGXSeasonNavlistItemComponent
    ],
    imports: [ 
        CommonModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonNavlistComponent,
        NGXSeasonNavlistSectionComponent,
        NGXSeasonNavlistItemComponent
    ]
})
export class NGXSeasonNavlistModule {}