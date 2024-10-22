import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NGXSeasonComponentsModule } from "../components/components.module";

import { HomePageComponent } from "./home/home.component";
import { DemoPageComponent } from "./demo/demo.component";
import { ErrorPageComponent } from "./error/error.component";
import { DemoButtonPageComponent } from "./demo/button.component";
import { DemoAlertPageComponent } from "./demo/alert.component";
import { DemoAvatarPageComponent } from "./demo/avatar.component";
import { DemoCardPageComponent } from "./demo/card.component";

@NgModule({
    declarations: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoAlertPageComponent,
        DemoAvatarPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        NGXSeasonComponentsModule
    ],
    exports: [
        HomePageComponent,
        DemoPageComponent,
        ErrorPageComponent,
        DemoAlertPageComponent,
        DemoAvatarPageComponent,
        DemoButtonPageComponent,
        DemoCardPageComponent
    ]
})
export class PageModule {}