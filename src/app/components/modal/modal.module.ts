import {DragDropModule} from '@angular/cdk/drag-drop';
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonButtonModule } from "../button/button.module";
import { NGXSeasonDividerModule } from "../divider/divider.module";
import { NGXSeasonEffectsModule } from "../effects/effects.module";
import { NGXSeasonIconModule } from "../icon/icon.module";

import { NGX_SEASON_MODAL_SIZE_MAP_TOKEN, NGXSeasonModalService } from "./modal.service";

import { NGXSeasonModalContentComponent, NGXSeasonModalFooterComponent, NGXSeasonModalHeaderComponent } from "./modal.component";

@NgModule({
    declarations: [
        NGXSeasonModalHeaderComponent,
        NGXSeasonModalFooterComponent,
        NGXSeasonModalContentComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        OverlayModule,
        PortalModule,

        NGXSeasonButtonModule,
        NGXSeasonDividerModule,
        NGXSeasonEffectsModule,
        NGXSeasonIconModule
    ],
    exports: [
        NGXSeasonModalHeaderComponent,
        NGXSeasonModalFooterComponent,
        NGXSeasonModalContentComponent
    ],
    providers: [
        NGXSeasonModalService,
        {
            provide: NGX_SEASON_MODAL_SIZE_MAP_TOKEN,
            useValue: {
                sm: { width: '60vw', height: '60vh' }, md: { width: '70vw', height: '70vh' }, lg: { width: '80vw', height: '80vh' }, xl: { width: '90vw', height: '90vh' }, fs: { width: '100vw', height: '100vh' }
            }
        }
    ]
})
export class NGXSeasonModalModule {}
