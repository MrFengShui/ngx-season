import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    exports: []
})
export class OctopusToastModule { }