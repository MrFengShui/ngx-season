import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonBreadcrumbComponent, NGXSeasonBreadcrumbItem } from "./breadcrumb.component";

@NgModule({
    declarations: [ 
        NGXSeasonBreadcrumbComponent,
        NGXSeasonBreadcrumbItem
    ],
    imports: [
        CommonModule,
        RouterModule,

        NGXSeasonIconModule
    ],
    exports: [ 
        NGXSeasonBreadcrumbComponent,
        NGXSeasonBreadcrumbItem
    ]
})
export class NGXSeasonBreadcrumbModule {}