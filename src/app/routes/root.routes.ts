import { Routes } from "@angular/router";

import { HomePageComponent } from "../page/home/home.component";
import { ErrorPageComponent } from "../page/error/error.component";
import { demoRoutes } from "./demo.routes";

export const rootRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, title: '主页', children: demoRoutes },
    { path: 'error', component: ErrorPageComponent, title: '错误' },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];