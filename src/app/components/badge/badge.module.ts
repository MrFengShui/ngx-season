import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OctopusBadge } from './badge.component';

@NgModule({
    declarations: [
        OctopusBadge
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusBadge
    ]
})
export class OctopusBadgeModule { }