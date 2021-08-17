import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OctopusRipple } from "./ripple.directive";

@NgModule({
    declarations: [
        OctopusRipple
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusRipple
    ]
})
export class OctopusRippleModule { }