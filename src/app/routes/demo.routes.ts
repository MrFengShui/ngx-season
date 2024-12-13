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
import { DemoBannerPageComponent } from "../page/demo/banner.component";
import { DemoBreadcrumbPageComponent } from "../page/demo/breadcrumb.component";
import { DemoBackgroundPageComponent } from "../page/demo/background.component";
import { DemoListPageComponent } from "../page/demo/list.component";
import { DemoIconPageComponent } from "../page/demo/icon.component";
import { DemoCheckboxPageComponent } from "../page/demo/checkbox.component";
import { DemoCheckSwitchPageComponent } from "../page/demo/check-switch.component";
import { DemoInputPageComponent } from "../page/demo/input.component";
import { DemoTooltipPageComponent } from "../page/demo/tooltip.component";
import { DemoComponentPageComponent } from "../page/demo/component.component";
import { DemoDividerPageComponent } from "../page/demo/divider.component";
import { DemoToastPageComponent } from "../page/demo/toast.component";
import { DemoRadioButtonPageComponent } from "../page/demo/radiobtn.component";
import { DemoRadioTogglePageComponent } from "../page/demo/radio-toggle.component";
import { DemoModalPageComponent } from "../page/demo/modal.component";
import { DemoPopoverPageComponent } from "../page/demo/popover.component";
import { DemoTagPageComponent } from "../page/demo/tag.component";
import { DemoTreePageComponent } from "../page/demo/tree.component";
import { DemoArticlePageComponent } from "../page/demo/article.component";
import { DemoTabbedPageComponent } from "../page/demo/tabbed.component";
import { DemoStatusPageComponent } from "../page/demo/status.component";

export const demoRoutes: Routes = [
    { path: '', redirectTo: 'component/accordion', pathMatch: 'full' },
    { path: 'component', component: DemoComponentPageComponent, title: '组件一览' },
    { path: 'component/accordion', component: DemoAccordionPageComponent, title: '手风琴' },
    { path: 'component/alert', component: DemoAlertPageComponent, title: '警示框' },
    { path: 'component/article', component: DemoArticlePageComponent, title: '文章' },
    { path: 'component/avatar', component: DemoAvatarPageComponent, title: '头像' },
    { path: 'component/badge', component: DemoBadgePageComponent, title: '徽章' },
    { path: 'component/banner', component: DemoBannerPageComponent, title: '占位符' },
    { path: 'component/breadcrumb', component: DemoBreadcrumbPageComponent, title: '面包屑' },
    { path: 'component/button', component: DemoButtonPageComponent, title: '按钮' },
    { path: 'component/card', component: DemoCardPageComponent, title: '卡片' },
    { path: 'component/carousel', component: DemoCarouselPageComponent, title: '轮播器' },
    { path: 'component/digital', component: DemoDigitalPageComponent, title: '数码' },
    { path: 'component/divider', component: DemoDividerPageComponent, title: '分割器' },
    { path: 'component/icon', component: DemoIconPageComponent, title: '图标' },
    { path: 'component/list', component: DemoListPageComponent, title: '列表' },
    { path: 'component/progress', component: DemoProgressPageComponent, title: '进度' },
    { path: 'component/ribbon', component: DemoRibbonPageComponent, title: '丝带' },
    { path: 'component/status', component: DemoStatusPageComponent, title: '状态' },
    { path: 'component/tabbed', component: DemoTabbedPageComponent, title: '选项卡' },
    { path: 'component/tag', component: DemoTagPageComponent, title: '标签' },
    { path: 'component/tree', component: DemoTreePageComponent, title: '树形列表' },

    { path: 'form/checkbox', component: DemoCheckboxPageComponent, title: '检查框' },
    { path: 'form/check-switch', component: DemoCheckSwitchPageComponent, title: '检查开关' },
    { path: 'form/input', component: DemoInputPageComponent, title: '输入框' },
    { path: 'form/radiobtn', component: DemoRadioButtonPageComponent, title: '选择框' },
    { path: 'form/radio-toggle', component: DemoRadioTogglePageComponent, title: '开关按钮' },

    { path: 'overlay/popover', component: DemoPopoverPageComponent, title: '悬浮框' },
    { path: 'overlay/modal', component: DemoModalPageComponent, title: '对话框' },
    { path: 'overlay/toast', component: DemoToastPageComponent, title: '消息框' },
    { path: 'overlay/tooltip', component: DemoTooltipPageComponent, title: '提示框' },

    { path: 'effect/background', component: DemoBackgroundPageComponent, title: '背景特效' },
];
