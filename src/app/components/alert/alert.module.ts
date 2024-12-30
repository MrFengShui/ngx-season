import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";
import { NGXSeasonOverlayModule } from "../overlay/overlay.module";

import { NGX_SEASON_ALERT_ICON_MAP_TOKEN, NGXSeasonAlertAddonComponent, NGXSeasonDetailAlertComponent, NGXSeasonNoticeAlertComponent, NGXSeasonToastAlertComponent } from "./alert.component";
import { NGXSeasonAlertDiscriptionDirective, NGXSeasonAlertMessageDirective, NGXSeasonAlertSubjectDirective } from "./alert.directive";

@NgModule({
    declarations: [
        NGXSeasonToastAlertComponent,
        NGXSeasonNoticeAlertComponent,
        NGXSeasonDetailAlertComponent,
        NGXSeasonAlertMessageDirective,
        NGXSeasonAlertAddonComponent,
        NGXSeasonAlertSubjectDirective,
        NGXSeasonAlertDiscriptionDirective
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule,
        NGXSeasonOverlayModule
    ],
    exports: [
        NGXSeasonToastAlertComponent,
        NGXSeasonNoticeAlertComponent,
        NGXSeasonDetailAlertComponent,
        NGXSeasonAlertAddonComponent,
        NGXSeasonAlertMessageDirective
    ],
    providers: [
        {
            provide: NGX_SEASON_ALERT_ICON_MAP_TOKEN,
            useValue: { success: 'success-standard', warning: 'warning-standard', failure: 'failure-standard', info: 'info-standard', help: 'help-standard' }
        }
    ]
})
export class NGXSeasonAlertModule {}
