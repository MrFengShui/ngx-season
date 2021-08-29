import { BidiModule } from "@angular/cdk/bidi";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusActionPlaceholder, OctopusIconPlaceholder, OctopusLoadingPlaceholder, OctopusMediaPlaceholder, OctopusMetaPlaceholder, OctopusNoDataPlaceholder, OctopusParagraphPlaceholder } from "./placeholder.component";

@NgModule({
    declarations: [
        OctopusActionPlaceholder,
        OctopusIconPlaceholder,
        OctopusMediaPlaceholder,
        OctopusMetaPlaceholder,
        OctopusParagraphPlaceholder,
        OctopusNoDataPlaceholder,
        OctopusLoadingPlaceholder
    ],
    imports: [
        CommonModule,
        BidiModule
    ],
    exports: [
        OctopusActionPlaceholder,
        OctopusIconPlaceholder,
        OctopusMediaPlaceholder,
        OctopusMetaPlaceholder,
        OctopusParagraphPlaceholder,
        OctopusNoDataPlaceholder,
        OctopusLoadingPlaceholder
    ]
})
export class OctopusPlaceholderModule { }