import { Routes } from "@angular/router";

import { HomePageComponent } from "../page/home/home.component";
import { ErrorPageComponent } from "../page/error/error.component";
import { demoRoutes } from "./demo.routes";
import { DemoPageComponent } from "../page/demo/demo.component";

export const rootRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'demo', component: DemoPageComponent, title: '演示文档', children: demoRoutes },
    { path: 'home', component: HomePageComponent, title: '主页' },
    { path: 'error', component: ErrorPageComponent, title: '错误' },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];