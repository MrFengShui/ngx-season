import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusDotBadge, OctopusTextBadge} from "./badge.directive";

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
export class OctopusBadgeModule {}
