import { ConnectedPosition, FlexibleConnectedPositionStrategy, FlexibleConnectedPositionStrategyOrigin, GlobalPositionStrategy, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef, ScrollStrategy, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";

import { Position } from "../global/enum.utils";

@Injectable()
export class OctopusPopup {

    private builder!: OverlayPositionBuilder;
    private options!: ScrollStrategyOptions;

    constructor(private _overlay: Overlay) {
        this.builder = this._overlay.position();
        this.options = this._overlay.scrollStrategies;
    }

    globalPosition(position: Position): GlobalPositionStrategy {
        switch (position) {
            case 'bottom center': return this.builder.global().bottom().centerHorizontally();
            case 'bottom left': return this.builder.global().bottom().left();
            case 'bottom right': return this.builder.global().bottom().right();
            case 'middle center': return this.builder.global().centerHorizontally().centerVertically();
            case 'middle left': return this.builder.global().centerVertically().left();
            case 'middle right': return this.builder.global().centerVertically().right();
            case 'top center': return this.builder.global().top().centerHorizontally();
            case 'top left': return this.builder.global().top().left();
            case 'top right': return this.builder.global().top().right();
            default: return this.builder.global().centerHorizontally().centerVertically();
        }
    }

    flexiblePosition(origin: FlexibleConnectedPositionStrategyOrigin, positions: ConnectedPosition[]): FlexibleConnectedPositionStrategy {
        return this.builder.flexibleConnectedTo(origin).withPositions(positions);
    }

    selectScroll(type: string): ScrollStrategy {
        switch (type) {
            case 'block': return this.options.block();
            case 'close': return this.options.close();
            case 'noop': return this.options.noop();
            case 'reposition': return this.options.reposition();
            default: return this.options.block();
        }
    }

    create(config?: OverlayConfig): OverlayRef {
        return this._overlay.create(config);
    }

}