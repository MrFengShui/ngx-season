import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import {OctopusTemplateView} from "./public/template.component";
import {OctopusLinkHubView} from "./public/general.component";

import {OctopusAllModule} from "./global/all.module";
import {OctopusPublicModule} from "./public/public.module";
import {DEMO_BUTTON_ROUTER, OctopusDemoButtonModule} from "./button/demo/demo.module";

const routes: Routes = [
    {path: '', redirectTo: '/general', pathMatch: 'full'},
    {path: 'general', component: OctopusLinkHubView},
    {path: 'accordion', component: OctopusTemplateView},
    {path: 'badge', component: OctopusTemplateView},
    {
        path: 'button', component: OctopusTemplateView,
        children: DEMO_BUTTON_ROUTER
    },
    {path: 'card', component: OctopusTemplateView},
    {path: 'carousel', component: OctopusTemplateView},
    {path: 'check', component: OctopusTemplateView},
    {path: 'combo', component: OctopusTemplateView},
    {path: 'datetime', component: OctopusTemplateView},
    {path: 'dialog', component: OctopusTemplateView},
    {path: 'drawer', component: OctopusTemplateView},
    {path: 'express', component: OctopusTemplateView},
    {path: 'figure', component: OctopusTemplateView},
    {path: 'holder', component: OctopusTemplateView},
    {path: 'icon', component: OctopusTemplateView},
    {path: 'input', component: OctopusTemplateView},
    {path: 'label', component: OctopusTemplateView},
    {path: 'overflow', component: OctopusTemplateView},
    {path: 'paginator', component: OctopusTemplateView},
    {path: 'queue', component: OctopusTemplateView},
    {path: 'radio', component: OctopusTemplateView},
    {path: 'ripple', component: OctopusTemplateView},
    {path: 'shadow', component: OctopusTemplateView},
    {path: 'sidenav', component: OctopusTemplateView},
    {path: 'split-line', component: OctopusTemplateView},
    {path: 'status', component: OctopusTemplateView},
    {path: 'stepper', component: OctopusTemplateView},
    {path: 'table', component: OctopusTemplateView},
    {path: 'tabs', component: OctopusTemplateView},
    {path: 'toast', component: OctopusTemplateView},
    {path: 'toolbar', component: OctopusTemplateView},
    {path: 'tree', component: OctopusTemplateView}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
}),
        OctopusPublicModule,
        OctopusAllModule,
        OctopusDemoButtonModule
    ],
    exports: [
        OctopusAllModule
    ]
})
export class AppRouterModule {}
