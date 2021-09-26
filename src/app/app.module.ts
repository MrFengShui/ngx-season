import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DemoModule } from './demo/demo.module';
import { OctopusBreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { OctopusButtonModule } from './components/button/button.module';
import { OctopusDividerModule } from './components/divider/divider.module';
import { OctopusIconModule } from './components/icon/icon.module';
import { OctopusListModule } from './components/list/list.module';
import { OctopusLayoutModule } from './layout/layout.module';
import { OctopusNavbarModule } from './container/navbar/navbar.module';

import { AppComponent } from './app.component';
import { DemoComponentOutlet } from './demo/component/component.component';
import { DemoContainerOutlet } from './demo/container/container.component';
import { DemoFormOutlet } from './demo/form/form.component';
import { DemoPopupOutlet } from './demo/popup/popup.component';
import { DemoDashboardView } from './demo/dashboard/dashboard.component';

const ROOT_ROUTERS: Routes = [
    { path: '', redirectTo: '/octopus/dashboard', pathMatch: 'full' },
    { path: 'octopus/dashboard', component: DemoDashboardView, data: { breadcrumb: 'Dashboard' } },
    {
        path: 'octopus/component', component: DemoComponentOutlet, data: { breadcrumb: 'Component' },
        loadChildren: () => import('./demo/component/component.module').then(module => module.ComponentViewModule)
    },
    {
        path: 'octopus/container', component: DemoContainerOutlet, data: { breadcrumb: 'Container' },
        loadChildren: () => import('./demo/container/container.module').then(module => module.ContainerViewModule)
    },
    {
        path: 'octopus/form', component: DemoFormOutlet, data: { breadcrumb: 'Form' },
        loadChildren: () => import('./demo/form/form.module').then(module => module.FormViewModule)
    },
    {
        path: 'octopus/popup', component: DemoPopupOutlet, data: { breadcrumb: 'Popup' },
        loadChildren: () => import('./demo/popup/popup.module').then(module => module.PopupViewModule)
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forRoot(ROOT_ROUTERS, {
            preloadingStrategy: PreloadAllModules,
            useHash: true,
            initialNavigation: 'enabled'
        }),
        DemoModule,
        OctopusBreadcrumbModule,
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
