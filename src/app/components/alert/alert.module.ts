import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGX_SEASON_ALERT_ICON_MAP_TOKEN } from "./alert.component";
import { NGXSeasonDetailAlertComponent } from "./alert-detail.component";
import { NGXSeasonToastAlertComponent, NGXSeasonAlertActionsDirective } from "./alert-toast.component";

@NgModule({
    declarations: [
        NGXSeasonAlertActionsDirective,
        NGXSeasonToastAlertComponent,
        NGXSeasonDetailAlertComponent
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonAlertActionsDirective,
        NGXSeasonToastAlertComponent,
        NGXSeasonDetailAlertComponent
    ],
    providers: [
        {
            provide: NGX_SEASON_ALERT_ICON_MAP_TOKEN,
            useValue: { success: 'success-standard', warning: 'warning-standard', failure: 'failure-standard', info: 'info-standard', help: 'help-standard' }
        }
    ]
})
export class NGXSeasonAlertModule {}
