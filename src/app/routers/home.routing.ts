import { Routes } from "@angular/router";

import { LiveComponent } from "../views/home/live/live.component";
import { AudioComponent } from "../views/home/audio/audio.component";
import { VideoHomeComponent } from "../views/home/video/vhome.component";
import { VideoComponent } from "../views/home/video/video.component";
import { WelcomeComponent } from "../views/home/welcome/welcome.component";
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
    { path: 'ahome', component: AudioHomeComponent, data: { breadcrumb: 'Audio Home' } },
    { path: 'audio/:action', component: AudioComponent, data: { breadcrumb: 'Audio' } },
    { path: 'vhome', component: VideoHomeComponent, data: { breadcrumb: 'Video Home' } },
    { path: 'video/:action', component: VideoComponent, data: { breadcrumb: 'Video' } },
    { path: 'setting', component: SettingComponent, data: { breadcrumb: 'Settings' } },
    { path: 'support', component: SupportComponent, data: { breadcrumb: 'Support' } },
    { path: 'report', component: ReportComponent, data: { breadcrumb: 'Bug Report' } }
];