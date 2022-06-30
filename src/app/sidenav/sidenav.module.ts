import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusSidenav, OctopusSidenavContainer, OctopusSidenavContent} from "./sidenav.component";

import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusSidenavContainer,
        OctopusSidenavContent,
        OctopusSidenav
    ],
    imports: [
        CommonModule,
        ScrollingModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusSidenavContainer,
        OctopusSidenavContent,
        OctopusSidenav
    ]
})
export class OctopusSidenavModule {}
