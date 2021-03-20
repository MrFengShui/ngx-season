import { Routes } from "@angular/router";

import { LiveComponent } from "../views/home/live/live.component";
import { AudioComponent } from "../views/home/audio/audio.component";
import { VideoHomeComponent } from "../views/home/video/vhome.component";
import { VideoComponent } from "../views/home/video/video.component";
import { WelcomeComponent } from "../views/home/welcome/welcome.component";
import { AudioHomeComponent } from "../views/home/audio/ahome.component";

export const HOME_ROUTER: Routes = [
    { path: 'live', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent, data: { breadcrumb: 'Welcome' } },
    { path: 'live/:type', component: LiveComponent, data: { breadcrumb: 'Live' } },
    { path: 'ahome', component: AudioHomeComponent, data: { breadcrumb: 'Audio Home' } },
    { path: 'audio/:action', component: AudioComponent, data: { breadcrumb: 'Audio' } },
    { path: 'vhome', component: VideoHomeComponent, data: { breadcrumb: 'Video Home' } },
    { path: 'video/:action', component: VideoComponent, data: { breadcrumb: 'Video' } }
];