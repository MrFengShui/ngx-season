import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Route} from "@angular/router";

import {OctopusButtonModule} from "../button.module";
import {OctopusPublicModule} from "../../public/public.module";
import {OctopusAllModule} from "../../global/all.module";

import {OctopusDemoButtonAPI, OctopusDemoButtonExample, OctopusDemoButtonOverview} from "./demo.component";
import {OctopusDemoButtonCase1} from "../case/case1.component";
import {OctopusDemoButtonCase2} from "../case/case2.component";
import {OctopusDemoButtonCase3} from "../case/case3.component";
import {OctopusDemoButtonCase4} from "../case/case4.component";
import {OctopusDemoButtonCase5} from "../case/case5.component";

export const DEMO_BUTTON_ROUTER: Route[] = [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: OctopusDemoButtonOverview},
    {path: 'api', component: OctopusDemoButtonAPI},
    {path: 'example', component: OctopusDemoButtonExample}
];

@NgModule({
    declarations: [
        OctopusDemoButtonOverview,
        OctopusDemoButtonAPI,
        OctopusDemoButtonExample,
        OctopusDemoButtonCase1,
        OctopusDemoButtonCase2,
        OctopusDemoButtonCase3,
        OctopusDemoButtonCase4,
        OctopusDemoButtonCase5
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        OctopusAllModule,
        OctopusPublicModule,
        OctopusButtonModule
    ],
    exports: [
        OctopusDemoButtonOverview,
        OctopusDemoButtonAPI,
        OctopusDemoButtonExample,
        OctopusDemoButtonCase1,
        OctopusDemoButtonCase2,
        OctopusDemoButtonCase3,
        OctopusDemoButtonCase4,
        OctopusDemoButtonCase5
    ]
})
export class OctopusDemoButtonModule {}
