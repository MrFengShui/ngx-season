import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";
import { NGXSeasonCheckModule } from "../check/check.module";
import { NGXSeasonRadioModule } from "../radio/radio.module";

import { NGXSeasonListComponent } from "./list.component";
import { NGXSeasonRadioListComponent } from "./radio-list.component";
import { NGXSeasonCheckListComponent } from "./check-list.component";
import { NGXSeasonListFooterDirective } from "./list-widget.component";
import { NGXSeasonListHeaderDirective } from "./list-widget.component";
import { NGXSeasonListMetaItemComponent } from "./list.component";
import { NGXSeasonListRadioItemComponent } from "./radio-list.component";
import { NGXSeasonListCheckItemComponent } from "./check-list.component";
import { NGXSeasonListItemComponent } from "./list.component";
import { NGXSeasonListMetaActionsDirective, NGXSeasonListMetaMediaDirective } from "./list-widget.component";

@NgModule({
    declarations: [
        NGXSeasonListComponent,
        NGXSeasonCheckListComponent,
        NGXSeasonRadioListComponent,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemComponent,
        NGXSeasonListCheckItemComponent,
        NGXSeasonListRadioItemComponent,
        NGXSeasonListMetaItemComponent,
        NGXSeasonListMetaActionsDirective,
        NGXSeasonListMetaMediaDirective
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonAvatarModule,
        NGXSeasonCheckModule,
        NGXSeasonRadioModule
    ],
    exports: [
        NGXSeasonListComponent,
        NGXSeasonCheckListComponent,
        NGXSeasonRadioListComponent,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemComponent,
        NGXSeasonListCheckItemComponent,
        NGXSeasonListRadioItemComponent,
        NGXSeasonListMetaItemComponent,
        NGXSeasonListMetaActionsDirective,
        NGXSeasonListMetaMediaDirective
    ]
})
export class NGXSeasonListModule {}
