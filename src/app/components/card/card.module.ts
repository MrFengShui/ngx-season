import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";

import { NGXSeasonCardComponent } from "./card.component";
import { NGXSeasonCardHeaderComponent, NGXSeasonCardHeaderDirective } from "./card-header.component";
import { NGXSeasonCardFooterComponent, NGXSeasonCardFooterDirective } from "./card-footer.component";
import { NGXSeasonCardActionBlockComponent, NGXSeasonCardMediaBlockComponent } from "./card-block.component";
import { NGXSeasonCardContentComponent } from "./card-content.component";
import { NGXSeasonCardImageDirective } from "./card-image.component";

@NgModule({
    declarations: [
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardHeaderDirective,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardFooterDirective,
        NGXSeasonCardActionBlockComponent,
        NGXSeasonCardMediaBlockComponent,
        NGXSeasonCardImageDirective,
        NGXSeasonCardContentComponent,
    ],
    imports: [
        CommonModule,
        NGXSeasonAvatarModule
    ],
    exports: [
        NGXSeasonCardComponent,
        NGXSeasonCardHeaderComponent,
        NGXSeasonCardHeaderDirective,
        NGXSeasonCardFooterComponent,
        NGXSeasonCardFooterDirective,
        NGXSeasonCardActionBlockComponent,
        NGXSeasonCardMediaBlockComponent,
        NGXSeasonCardImageDirective,
        NGXSeasonCardContentComponent,
    ]
})
export class NGXSeasonCardModule {}