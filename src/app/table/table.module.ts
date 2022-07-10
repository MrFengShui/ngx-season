import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkTableModule} from "@angular/cdk/table";

import {OctopusTable, OctopusTableFoot} from "./table.component";

@NgModule({
    declarations: [
        OctopusTable,
        OctopusTableFoot
    ],
    imports: [
        CommonModule,
        CdkTableModule
    ],
    exports: [
        OctopusTable,
        OctopusTableFoot
    ]
})
export class OctopusTableModule {}
