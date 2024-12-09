import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGXSeasonTabbedGroupComponent, NGXSeasonTabbedPanelComponent } from "./tabbed.component";
import { NGXSeasonTabbedContentBoxComponent, NGXSeasonTabbedControlBarComponent } from "./tabbed-widget.component";

@NgModule({
    declarations: [
        NGXSeasonTabbedGroupComponent,
        NGXSeasonTabbedPanelComponent,
        NGXSeasonTabbedControlBarComponent,
        NGXSeasonTabbedContentBoxComponent
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonTabbedGroupComponent,
        NGXSeasonTabbedPanelComponent
    ]
})
export class NGXSeasonTabbedModule {}
