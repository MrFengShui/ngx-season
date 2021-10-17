import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OctopusButtonModule } from 'src/app/components/button/button.module';
import { OctopusIconModule } from 'src/app/components/icon/icon.module';

import { OctopusNumber } from './number.component';

@NgModule({
    declarations: [
        OctopusNumber
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusNumber
    ]
})
export class OctopusNumberModule { }