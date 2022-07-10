import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import {OctopusTemplateOverlayView, OctopusTemplateView} from "./hub/template.component";
import {OctopusLinkHubView} from "./hub/general.component";

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
import {OctopusProgressModule} from "./progress/progress.module";
import {OctopusPaginatorModule} from "./paginator/paginator.module";
import {OctopusTreeModule} from "./tree/tree.module";
import {OctopusTableModule} from "./table/table.module";
import {OctopusCardModule} from "./card/card.module";
import {OctopusStepperModule} from "./stepper/stepper.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OctopusFormModule} from "./form/form.module";

const routes: Routes = [
    {path: '', redirectTo: '/general', pathMatch: 'full'},
    {path: 'general', component: OctopusLinkHubView},
    {path: 'accordion', component: OctopusTemplateView},
    {path: 'badge', component: OctopusTemplateView},
    {path: 'button', component: OctopusTemplateView},
    {path: 'card', component: OctopusTemplateView},
    {path: 'carousel', component: OctopusTemplateView},
    {path: 'check', component: OctopusTemplateView},
    {path: 'combo', component: OctopusTemplateView},
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
    declarations: [
        OctopusTemplateView,
        OctopusTemplateOverlayView,
        OctopusLinkHubView
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            preloadingStrategy: PreloadAllModules,
            useHash: true
        }),
        OctopusAccordionModule,
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusCardModule,
        OctopusCarouselModule,
        OctopusEffectsModule,
        OctopusExpressModule,
        OctopusFormModule,
        OctopusImageModule,
        OctopusLabelModule,
        OctopusMatrixModule,
        OctopusMenuModule,
        OctopusOverlayModule,
        OctopusPaginatorModule,
        OctopusProgressModule,
        OctopusQueueModule,
        OctopusSidenavModule,
        OctopusStepperModule,
        OctopusTabModule,
        OctopusTableModule,
        OctopusToolbarModule,
        OctopusToolsModule,
        OctopusTreeModule
    ],
    exports: [
        OctopusTemplateView,
        OctopusTemplateOverlayView,
        OctopusLinkHubView,
        OctopusAccordionModule,
        OctopusBadgeModule,
        OctopusButtonModule,
        OctopusCardModule,
        OctopusCarouselModule,
        OctopusEffectsModule,
        OctopusExpressModule,
        OctopusFormModule,
        OctopusImageModule,
        OctopusLabelModule,
        OctopusMatrixModule,
        OctopusMenuModule,
        OctopusOverlayModule,
        OctopusPaginatorModule,
        OctopusProgressModule,
        OctopusQueueModule,
        OctopusSidenavModule,
        OctopusStepperModule,
        OctopusTabModule,
        OctopusTableModule,
        OctopusToolbarModule,
        OctopusToolsModule,
        OctopusTreeModule
    ]
})
export class AppRouterModule {}
