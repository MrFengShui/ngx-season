import { Routes } from "@angular/router";

import { LiveComponent } from "../views/home/live/live.component";
import { AudioComponent } from "../views/home/media/audio.component";
import { VideoComponent } from "../views/home/media/video.component";
import { PlazzaComponent } from "../views/home/index/plazza.component";
import { WelcomeComponent } from "../views/home/index/welcome.component";
import { ReportComponent } from "../views/home/report/report.component";
import { HomeSettingComponent } from "../views/home/setting/setting.component";
import { HomeSettingAccountComponent } from "../views/home/setting/account.component";
import { HomeSettingLanguageComponent } from "../views/home/setting/language.component";
import { HomeSettingNoticeComponent } from "../views/home/setting/notice.component";
import { HomeSettingSecurityComponent } from "../views/home/setting/security.component";
import { HomeSettingThemeComponent } from "../views/home/setting/theme.component";
import { HomeSettingModeComponent } from "../views/home/setting/mode.component";
import { HomeSupportComponent } from "../views/home/support/support.component";
import { HomeSupportAboutComponent } from "../views/home/support/about.component";

export const HOME_SETTING_ROUTER: Routes = [
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'account', component: HomeSettingAccountComponent, data: { breadcrumb: 'Account' } },
    { path: 'language', component: HomeSettingLanguageComponent, data: { breadcrumb: 'Language' } },
    { path: 'mode', component: HomeSettingModeComponent, data: { breadcrumb: 'Mode' } },
    { path: 'notice', component: HomeSettingNoticeComponent, data: { breadcrumb: 'Notification' } },
    { path: 'security', component: HomeSettingSecurityComponent, data: { breadcrumb: 'Security' } },
    { path: 'theme', component: HomeSettingThemeComponent, data: { breadcrumb: 'Theme' } },
];

export const HOME_SUPPORT_ROUTER: Routes = [
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    // { path: 'account', component: HomeSettingAccountComponent, data: { breadcrumb: 'Account' } },
    // { path: 'language', component: HomeSettingLanguageComponent, data: { breadcrumb: 'Language' } },
    // { path: 'mode', component: HomeSettingModeComponent, data: { breadcrumb: 'Mode' } },
    // { path: 'notice', component: HomeSettingNoticeComponent, data: { breadcrumb: 'Notification' } },
    // { path: 'security', component: HomeSettingSecurityComponent, data: { breadcrumb: 'Security' } },
    { path: 'about', component: HomeSupportAboutComponent, data: { breadcrumb: 'About' } },
];

export const HOME_ROUTER: Routes = [
    { path: 'live', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'audio', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'video', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'article', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'blog', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'gallery', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent, data: { breadcrumb: 'Welcome' } },
    { path: 'live/:type', component: LiveComponent, data: { breadcrumb: 'Live' } },
    { path: 'plazza/audio', component: PlazzaComponent, data: { breadcrumb: 'Audio Home' } },
    { path: 'audio/:action', component: AudioComponent, data: { breadcrumb: 'Audio' } },
    { path: 'plazza/video', component: PlazzaComponent, data: { breadcrumb: 'Video Home' } },
    { path: 'video/:action', component: VideoComponent, data: { breadcrumb: 'Video' } },
    { path: 'plazza/article', component: PlazzaComponent, data: { breadcrumb: 'Article Home' } },
    { path: 'article/:action', component: AudioComponent, data: { breadcrumb: 'Article' } },
    { path: 'plazza/gallery', component: PlazzaComponent, data: { breadcrumb: 'Gallery Home' } },
    { path: 'gallery/:action', component: VideoComponent, data: { breadcrumb: 'Article' } },
    {
        path: 'setting', component: HomeSettingComponent, data: { breadcrumb: 'Settings' },
        loadChildren: () => import('../views/home/setting/setting.module').then(module => module.HomeSettingModule)
    },
    {
        path: 'support', component: HomeSupportComponent, data: { breadcrumb: 'Support' },
        loadChildren: () => import('../views/home/support/support.module').then(module => module.HomeSupportModule)
    },
    { path: 'report', component: ReportComponent, data: { breadcrumb: 'Bug Report' } }
];