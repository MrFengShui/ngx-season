import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { OctopusButtonModule } from './components/button/button.module';
import { OctopusDividerModule } from './components/divider/divider.module';
import { OctopusIconModule } from './components/icon/icon.module';
import { OctopusListModule } from './components/list/list.module';
import { OctopusLayoutModule } from './layout/layout.module';
import { OctopusNavbarModule } from './container/navbar/navbar.module';

import { AppComponent } from './app.component';
import { DemoComponentOutlet } from './demo/components/component.component';


const ROOT_ROUTERS: Routes = [
    { path: '', redirectTo: '/octopus/component/badge', pathMatch: 'full' },
    {
        path: 'octopus/component', component: DemoComponentOutlet, data: { breadcrumb: 'Demonstration' },
        loadChildren: () => import('./demo/components/component.module').then(module => module.ComponentViewModule)
    },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forRoot(ROOT_ROUTERS, {
            preloadingStrategy: PreloadAllModules,
            useHash: true,
            initialNavigation: 'enabled'
        }),
        OctopusButtonModule,
        OctopusIconModule,
        OctopusDividerModule,
        OctopusListModule,
        OctopusLayoutModule,
        OctopusNavbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
