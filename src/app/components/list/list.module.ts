import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonCheckModule } from "../check/check.module";
import { NGXSeasonImageModule } from "../image/image.module";
import { NGXSeasonRadioModule } from "../radio/radio.module";

import { NGXSeasonDragDropListComponent, NGXSeasonListComponent, NGXSeasonMetaListComponent, NGXSeasonSelectionListComponent } from "./list.component";
import { NGXSeasonListItemDirective, NGXSeasonListSectionDirective, NGXSeasonListHeaderDirective, NGXSeasonListFooterDirective, NGXSeasonListDividerDirective, NGXSeasonListItemTemplateDirective, NGXSeasonListOptionDirective } from "./list.directive";

@NgModule({
    declarations: [
        NGXSeasonListComponent,
        NGXSeasonMetaListComponent,
        NGXSeasonDragDropListComponent,
        NGXSeasonSelectionListComponent,
        NGXSeasonListItemDirective,
        NGXSeasonListOptionDirective,
        NGXSeasonListDividerDirective,
        NGXSeasonListSectionDirective,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemTemplateDirective
    ],
    imports: [
        CommonModule,
        DragDropModule,
        PortalModule,

        NGXSeasonCheckModule,
        NGXSeasonImageModule,
        NGXSeasonRadioModule
    ],
    exports: [
        NGXSeasonListComponent,
        NGXSeasonMetaListComponent,
        NGXSeasonDragDropListComponent,
        NGXSeasonSelectionListComponent,
        NGXSeasonListItemDirective,
        NGXSeasonListOptionDirective,
        NGXSeasonListDividerDirective,
        NGXSeasonListSectionDirective,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemTemplateDirective
    ]
})
export class NGXSeasonListModule {}
