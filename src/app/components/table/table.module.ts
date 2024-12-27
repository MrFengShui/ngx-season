import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonEffectsModule } from "../effects/effects.module";
import { NGXSeasonPaginatorModule } from "../paginator/paginator.module";
import { NGXSeasonSearchModule } from "../search/search.module";

import { NGXSeasonTableComponent } from "./table.component";
import { NGXSeasonTHeadCellDirective, NGXSeasonTHeadRowDefDirective, NGXSeasonTHeadRowDirective } from "./table-head.directive";
import { NGXSeasonTBodyCellDirective, NGXSeasonTBodyRowDefDirective, NGXSeasonTBodyRowDirective } from "./table-body.directive";
import { NGXSeasonTFootRowDefDirective, NGXSeasonTFootRowDirective, NGXSeasonTFootCellDirective } from "./table-foot.directive";
import { NGXSeasonTableCaptionDirective } from "./table.directive";

@NgModule({
    declarations: [
        NGXSeasonTableComponent,
        NGXSeasonTHeadRowDefDirective,
        NGXSeasonTHeadRowDirective,
        NGXSeasonTHeadCellDirective,
        NGXSeasonTBodyRowDefDirective,
        NGXSeasonTBodyRowDirective,
        NGXSeasonTBodyCellDirective,
        NGXSeasonTFootRowDefDirective,
        NGXSeasonTFootRowDirective,
        NGXSeasonTFootCellDirective,
        NGXSeasonTableCaptionDirective
    ],
    imports: [
        CommonModule,
        PortalModule,
        ScrollingModule,

        NGXSeasonEffectsModule,
        NGXSeasonPaginatorModule,
        NGXSeasonSearchModule
    ],
    exports: [
        NGXSeasonTableComponent,
        NGXSeasonTHeadRowDefDirective,
        NGXSeasonTHeadRowDirective,
        NGXSeasonTHeadCellDirective,
        NGXSeasonTBodyRowDefDirective,
        NGXSeasonTBodyRowDirective,
        NGXSeasonTBodyCellDirective,
        NGXSeasonTFootRowDefDirective,
        NGXSeasonTFootRowDirective,
        NGXSeasonTFootCellDirective,
        NGXSeasonTableCaptionDirective
    ]
})
export class NGXSeasonTableModule {}
