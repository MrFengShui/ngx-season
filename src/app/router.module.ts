import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import {OctopusTemplateOverlayView, OctopusTemplateView} from "./template/template.component";

import {OctopusButtonModule} from "./button/button.module";
import {OctopusImageModule} from "./image/image.module";
import {OctopusQueueModule} from "./queue/queue.module";
import {OctopusToolsModule} from "./tools/tools.module";
import {OctopusEffectsModule} from "./effects/effects.module";
import {OctopusToolbarModule} from "./toolbar/toolbar.module";
import {OctopusSidenavModule} from "./sidenav/sidenav.module";
import {OctopusTabModule} from "./tabs/tabs.module";
import {OctopusExpressModule} from "./express/express.module";
import {OctopusCarouselModule} from "./carousel/carousel.module";
import {OctopusLabelModule} from "./label/label.module";
import {OctopusOverlayModule} from "./overlay/overlay.module";
import {OctopusMenuModule} from "./menu/menu.module";
import {OctopusAccordionModule} from "./accordion/accordion.module";
import {OctopusBadgeModule} from "./badge/badge.module";
import {OctopusMatrixModule} from "./matrix/matrix.module";

const routes: Routes = [
    {path: '', redirectTo: '/carousel', pathMatch: 'full'},
    {path: 'button', component: OctopusTemplateView},
    {path: 'carousel', component: OctopusTemplateView},
    {path: 'express', component: OctopusTemplateView},
    {path: 'icon', component: OctopusTemplateView},
    {path: 'label', component: OctopusTemplateView},
    {path: 'queue', component: OctopusTemplateView},
    {path: 'sidenav', component: OctopusTemplateView},
    {path: 'toolbar', component: OctopusTemplateView},
    {path: 'tools', component: OctopusTemplateView}
];

@NgModule({
    declarations: [
        OctopusTemplateView,
        OctopusTemplateOverlayView
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            preloadingStrategy: PreloadAllModules,
            useHash: true
        }),
        OctopusAccordionModule,
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusCarouselModule,
        OctopusEffectsModule,
        OctopusExpressModule,
        OctopusImageModule,
        OctopusLabelModule,
        OctopusMatrixModule,
        OctopusMenuModule,
        OctopusOverlayModule,
        OctopusQueueModule,
        OctopusSidenavModule,
        OctopusTabModule,
        OctopusToolbarModule,
        OctopusToolsModule
    ],
    exports: [
        OctopusTemplateView,
        OctopusTemplateOverlayView,
        OctopusAccordionModule,
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusCarouselModule,
        OctopusEffectsModule,
        OctopusExpressModule,
        OctopusImageModule,
        OctopusLabelModule,
        OctopusMatrixModule,
        OctopusMenuModule,
        OctopusOverlayModule,
        OctopusQueueModule,
        OctopusSidenavModule,
        OctopusTabModule,
        OctopusToolbarModule,
        OctopusToolsModule
    ]
})
export class AppRouterModule {}
