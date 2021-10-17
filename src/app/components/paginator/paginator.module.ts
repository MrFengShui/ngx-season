import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { OctopusFieldModule } from "src/app/form/field/field.module";
import { OctopusButtonModule } from '../button/button.module';
import { OctopusIconModule } from '../icon/icon.module';

import { OctopusPaginator } from './paginator.component';

import { OctopusPaginatorOption } from './paginator.service';

@NgModule({
    declarations: [
        OctopusPaginator
    ],
    imports: [
        CommonModule,
        FormsModule,
        OctopusButtonModule,
        OctopusIconModule,
        OctopusFieldModule
    ],
    exports: [
        OctopusPaginator
    ],
    providers: [
        OctopusPaginatorOption
    ]
})
export class OctopusPaginatorModule { }