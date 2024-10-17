import { Routes } from "@angular/router";
import { DemoButtonPageComponent } from "../page/demo/button.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'demo/button', pathMatch: 'full' },
    { path: 'demo/button', component: DemoButtonPageComponent, title: '按钮' }
];