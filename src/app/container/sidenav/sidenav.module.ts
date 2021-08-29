import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusSidenav, OctopusSidenavContent, OctopusSidenavControl } from "./sidenav.component";


@NgModule({
    declarations: [
        OctopusSidenav,
        OctopusSidenavControl,
        OctopusSidenavContent
    ],
    imports: [
        CommonModule,
        PortalModule
    ],
    exports: [
        OctopusSidenav,
        OctopusSidenavControl,
        OctopusSidenavContent
    ]
})
export class OctopusSidenavModule { }