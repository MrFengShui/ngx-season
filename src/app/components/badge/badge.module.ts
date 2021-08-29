import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OctopusDotBadge } from './dot.component';
import { OctopusTextBadge } from './text.component';

@NgModule({
    declarations: [
        OctopusDotBadge,
        OctopusTextBadge
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusDotBadge,
        OctopusTextBadge
    ]
})
export class OctopusBadgeModule { }