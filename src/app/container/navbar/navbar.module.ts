import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";

import { OctopusNavbar, OctopusNavbarBrand, OctopusNavbarSearch } from './navbar.component';

@NgModule({
    declarations: [
        OctopusNavbar,
        OctopusNavbarBrand,
        OctopusNavbarSearch
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusNavbar,
        OctopusNavbarBrand,
        OctopusNavbarSearch
    ]
})
export class OctopusNavbarModule { }