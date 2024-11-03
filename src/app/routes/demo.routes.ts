import { Routes } from "@angular/router";
import { DemoButtonPageComponent } from "../page/demo/button.component";
import { DemoAlertPageComponent } from "../page/demo/alert.component";
import { DemoAvatarPageComponent } from "../page/demo/avatar.component";
import { DemoCardPageComponent } from "../page/demo/card.component";
import { DemoAccordionPageComponent } from "../page/demo/accordion.component";
import { DemoBadgePageComponent } from "../page/demo/badge.component";
import { DemoRibbonPageComponent } from "../page/demo/ribbon.component";
import { DemoCarouselPageComponent } from "../page/demo/carousel.component";
import { DemoProgressPageComponent } from "../page/demo/progress.component";
import { DemoDigitalPageComponent } from "../page/demo/digital.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'accordion', pathMatch: 'full' },
    { path: 'accordion', component: DemoAccordionPageComponent, title: '手风琴' },
    { path: 'alert', component: DemoAlertPageComponent, title: '警示框' },
    { path: 'avatar', component: DemoAvatarPageComponent, title: '头像' },
    { path: 'badge', component: DemoBadgePageComponent, title: '徽章' },
    { path: 'button', component: DemoButtonPageComponent, title: '按钮' },
    { path: 'card', component: DemoCardPageComponent, title: '卡片' },
    { path: 'carousel', component: DemoCarouselPageComponent, title: '轮播器' },
    { path: 'digital', component: DemoDigitalPageComponent, title: '数码' },
    { path: 'progress', component: DemoProgressPageComponent, title: '进度' },
    { path: 'ribbon', component: DemoRibbonPageComponent, title: '丝带' },
];