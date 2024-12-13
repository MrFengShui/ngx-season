import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";
import { NGXSeasonButtonModule } from "../button/button.module";

import { NGXSeasonCardComponent } from "./card.component";
import { NGXSeasonCardHeaderComponent } from "./card-widget.component";
import { NGXSeasonCardFooterComponent } from "./card-widget.component";
import { NGXSeasonCardContentComponent } from "./card-widget.component";
import { NGXSeasonCardMediaComponent, NGXSeasonCardMediaDirective } from "./card-media.component";

@NgModule({
    declarations: [
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardMediaComponent,
        NGXSeasonCardMediaDirective,
        NGXSeasonCardContentComponent,
    ],
    imports: [
        CommonModule,
        PortalModule,

        NGXSeasonAvatarModule,
        NGXSeasonButtonModule
    ],
    exports: [
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardMediaComponent,
        NGXSeasonCardMediaDirective,
        NGXSeasonCardContentComponent,
    ]
})
export class NGXSeasonCardModule {}
