import { Routes } from "@angular/router";
import { DemoButtonPageComponent } from "../page/demo/button.component";
import { DemoAlertPageComponent } from "../page/demo/alert.component";
import { DemoAvatarPageComponent } from "../page/demo/avatar.component";
import { DemoCardPageComponent } from "../page/demo/card.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'alert', pathMatch: 'full' },
    { path: 'alert', component: DemoAlertPageComponent, title: '警示框' },
    { path: 'avatar', component: DemoAvatarPageComponent, title: '头像' },
    { path: 'button', component: DemoButtonPageComponent, title: '按钮' },
    { path: 'card', component: DemoCardPageComponent, title: '卡片' },
];