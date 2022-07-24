import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusActionQueue,
    OctopusQueueLink,
    OctopusQueue,
    OctopusQueueFooter,
    OctopusQueueHeader,
    OctopusQueueFavicon,
    OctopusQueueItem,
    OctopusQueueLabel,
    OctopusQueueLine,
    OctopusQueueSection,
    OctopusQueueText,
    OctopusActionQueueItem,
    OctopusSelectQueue, OctopusQueueOption
} from "./queue.component";

import {OctopusEffectsModule} from "../effects/effects.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusQueueHeader,
        OctopusQueueFooter,
        OctopusQueueSection,
        OctopusQueueLabel,
        OctopusQueueFavicon,
        OctopusQueueText,
        OctopusQueueLine,
        OctopusActionQueueItem,
        OctopusQueueItem,
        OctopusQueueLink,
        OctopusQueueOption,
        OctopusQueue,
        OctopusActionQueue,
        OctopusSelectQueue
    ],
    imports: [
        CommonModule,
        OctopusEffectsModule,
        OctopusImageModule
    ],
    exports: [
        OctopusQueueHeader,
        OctopusQueueFooter,
        OctopusQueueSection,
        OctopusQueueLabel,
        OctopusQueueFavicon,
        OctopusQueueText,
        OctopusQueueLine,
        OctopusActionQueueItem,
        OctopusQueueItem,
        OctopusQueueLink,
        OctopusQueueOption,
        OctopusQueue,
        OctopusActionQueue,
        OctopusSelectQueue
    ]
})
export class OctopusQueueModule {}
