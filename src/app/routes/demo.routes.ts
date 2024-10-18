import { Routes } from "@angular/router";
import { DemoButtonPageComponent } from "../page/demo/button.component";
import { DemoAlertPageComponent } from "../page/demo/alert.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'alert', pathMatch: 'full' },
    { path: 'alert', component: DemoAlertPageComponent, title: '警示框' },
    { path: 'button', component: DemoButtonPageComponent, title: '按钮' },
];