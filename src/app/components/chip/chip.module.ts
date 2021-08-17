import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusChip } from "./chip.component";
import { OctopusChipIcon } from "./icon.component";
import { OctopusChipList } from "./list.component";

@NgModule({
    declarations: [
        OctopusChip,
        OctopusChipIcon,
        OctopusChipList
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusChip,
        OctopusChipIcon,
        OctopusChipList
    ]
})
export class OctopusChipModule { }