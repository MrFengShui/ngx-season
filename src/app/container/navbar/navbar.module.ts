import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "src/app/components/button/button.module";

import { OctopusNavbar, OctopusNavbarBrand } from './navbar.component';

@NgModule({
    declarations: [
        OctopusNavbar,
        OctopusNavbarBrand
    ],
    imports: [
        CommonModule,
        OctopusButtonModule
    ],
    exports: [
        OctopusNavbar,
        OctopusNavbarBrand
    ]
})
export class OctopusNavbarModule { }