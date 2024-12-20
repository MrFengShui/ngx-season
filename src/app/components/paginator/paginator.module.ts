import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonSelectModule } from "../select/select.module";

import { NGX_SEASON_PAGINATOR_LOCALIZATION_TOKEN, NGXSeasonPaginatorComponent } from "./paginator.component";

@NgModule({
    declarations: [
        NGXSeasonPaginatorComponent
    ],
    imports: [
        CommonModule,

        NGXSeasonButtonModule,
        NGXSeasonSelectModule
    ],
    exports: [
        NGXSeasonPaginatorComponent
    ],
    providers: [{ provide: NGX_SEASON_PAGINATOR_LOCALIZATION_TOKEN, useValue: { pageSize: '每页显示行数（第${startRow}行到第${finalRow}行）', metainfo: '第${pageIndex}页，共${pageCount}页' } }]
})
export class NGXSeasonPaginatorModule {}
