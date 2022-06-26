import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusNavigatorQueue, OctopusNavigatorQueueItem,
    OctopusQueue,
    OctopusQueueHeader,
    OctopusQueueIcon, OctopusQueueImage,
    OctopusQueueItem, OctopusQueueLine, OctopusQueueText
} from "./queue.component";

import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusQueueHeader,
        OctopusQueueImage,
        OctopusQueueIcon,
        OctopusQueueText,
        OctopusQueueLine,
        OctopusQueue,
        OctopusNavigatorQueue,
        OctopusQueueItem,
        OctopusNavigatorQueueItem
    ],
    imports: [
        CommonModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusQueueHeader,
        OctopusQueueImage,
        OctopusQueueIcon,
        OctopusQueueText,
        OctopusQueueLine,
        OctopusQueue,
        OctopusNavigatorQueue,
        OctopusQueueItem,
        OctopusNavigatorQueueItem
    ]
})
export class OctopusQueueModule {}
