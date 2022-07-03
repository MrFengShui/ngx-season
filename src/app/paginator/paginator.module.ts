import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkMenuModule} from "@angular/cdk/menu";

import {OctopusPaginator} from "./paginator.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusPaginator
    ],
    imports: [
        CommonModule,
        CdkMenuModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusPaginator
    ]
})
export class OctopusPaginatorModule {}
