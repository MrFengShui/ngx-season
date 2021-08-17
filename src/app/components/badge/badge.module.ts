import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OctopusDotBadge } from './dot-bdg.directive';
import { OctopusTextBadge } from './text-bdg.directive';

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