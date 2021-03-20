import { Routes } from "@angular/router";

import { HomeComponent } from "../views/home/home.component";
import { OtherComponent } from "../views/other/other.component";

export const ROOT_ROUTER: Routes = [
    { path: '', redirectTo: '/home/welcome', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' },
        loadChildren: () => import('../views/home/home.module').then(module => module.HomeModule)
    },
    {
        path: 'other', component: OtherComponent, data: { breadcrumb: 'Home' },
        loadChildren: () => import('../views/other/other.module').then(module => module.OtherModule)
    },
    { path: '**', redirectTo: '/other/error', pathMatch: 'full' }
];