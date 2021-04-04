import { Routes } from "@angular/router";

import { LiveComponent } from "../views/home/live/live.component";
import { AudioComponent } from "../views/home/audio/audio.component";
import { PlazzaComponent } from "../views/home/index/plazza.component";
import { VideoComponent } from "../views/home/video/video.component";
import { WelcomeComponent } from "../views/home/index/welcome.component";
import { AudioHomeComponent } from "../views/home/audio/ahome.component";
import { SupportComponent } from "../views/home/support/support.component";
import { SettingComponent } from "../views/home/setting/setting.component";
import { ReportComponent } from "../views/home/report/report.component";

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
    { path: 'setting', component: SettingComponent, data: { breadcrumb: 'Settings' } },
    { path: 'support', component: SupportComponent, data: { breadcrumb: 'Support' } },
    { path: 'report', component: ReportComponent, data: { breadcrumb: 'Bug Report' } }
];