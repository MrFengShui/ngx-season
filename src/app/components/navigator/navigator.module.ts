import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonNavigatorblockComponent } from "./nav-block.component";
import { NGXSeasonNavigatorListComponent } from "./nav-list.component";
import { NGXSeasonNavigatorLinkComponent } from "./navl-ink.component";

@NgModule({
    declarations: [
        NGXSeasonNavigatorListComponent,
        NGXSeasonNavigatorblockComponent,
        NGXSeasonNavigatorLinkComponent
    ],
    imports: [ 
        CommonModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonNavigatorListComponent,
        NGXSeasonNavigatorblockComponent,
        NGXSeasonNavigatorLinkComponent
    ]
})
export class NGXSeasonNavigatorModule {}