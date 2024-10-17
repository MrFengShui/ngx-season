import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { NGXSeasonComponentsModule } from "../components/components.module";

import { HomePageComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error/error.component";
import { DemoButtonPageComponent } from "./demo/button.component";

@NgModule({
    declarations: [
        HomePageComponent,
        ErrorPageComponent,
        DemoButtonPageComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,

        NGXSeasonComponentsModule
    ],
    exports: [
        HomePageComponent,
        ErrorPageComponent,
        DemoButtonPageComponent
    ]
})
export class PageModule {}