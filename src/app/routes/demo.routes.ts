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
import { DemoPlaceholderPageComponent } from "../page/demo/placeholder.component";
import { DemoBreadcrumbPageComponent } from "../page/demo/breadcrumb.component";
import { DemoBackgroundPageComponent } from "../page/demo/background.component";
import { DemoListPageComponent } from "../page/demo/list.component";
import { DemoIconPageComponent } from "../page/demo/icon.component";
import { DemoCheckboxPageComponent } from "../page/demo/checkbox.component";
import { DemoCheckSwitchPageComponent } from "../page/demo/check-switch.component";
import { DemoInputPageComponent } from "../page/demo/input.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'accordion', pathMatch: 'full' },
    { path: 'accordion', component: DemoAccordionPageComponent, title: '手风琴' },
    { path: 'alert', component: DemoAlertPageComponent, title: '警示框' },
    { path: 'avatar', component: DemoAvatarPageComponent, title: '头像' },
    { path: 'background', component: DemoBackgroundPageComponent, title: '背景特效' },
    { path: 'badge', component: DemoBadgePageComponent, title: '徽章' },
    { path: 'breadcrumb', component: DemoBreadcrumbPageComponent, title: '面包屑' },
    { path: 'button', component: DemoButtonPageComponent, title: '按钮' },
    { path: 'card', component: DemoCardPageComponent, title: '卡片' },
    { path: 'carousel', component: DemoCarouselPageComponent, title: '轮播器' },
    { path: 'checkbox', component: DemoCheckboxPageComponent, title: '检查框' },
    { path: 'check-switch', component: DemoCheckSwitchPageComponent, title: '开关' },
    { path: 'digital', component: DemoDigitalPageComponent, title: '数码' },
    { path: 'icon', component: DemoIconPageComponent, title: '图标' },
    { path: 'input', component: DemoInputPageComponent, title: '输入框' },
    { path: 'list', component: DemoListPageComponent, title: '列表' },
    { path: 'placeholder', component: DemoPlaceholderPageComponent, title: '占位符' },
    { path: 'progress', component: DemoProgressPageComponent, title: '进度' },
    { path: 'ribbon', component: DemoRibbonPageComponent, title: '丝带' },
];