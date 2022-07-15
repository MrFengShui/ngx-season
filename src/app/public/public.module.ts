import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HighlightModule} from "ngx-highlightjs";

import {OctopusAllModule} from "../global/all.module";

import {OctopusTemplateView} from "./template.component";
import {OctopusLinkHubView} from "./general.component";
import {OctopusSection} from "./section.component";
import {OctopusSnippet} from "./snippet.component";

@NgModule({
    declarations: [
        OctopusTemplateView,
        OctopusLinkHubView,
        OctopusSection,
        OctopusSnippet
    ],
    imports: [
        CommonModule,
        RouterModule,
        ClipboardModule,
        HighlightModule,
        OctopusAllModule
    ],
    exports: [
        OctopusTemplateView,
        OctopusLinkHubView,
        OctopusSection,
        OctopusSnippet
    ]
})
export class OctopusPublicModule {}
