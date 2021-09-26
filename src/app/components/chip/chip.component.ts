import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'img[octopus-chip-icon]',
    template: ''
})
export class OctopusChipIcon implements OnInit {

    @HostBinding('class') class: string = 'octopus-chip-icon';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this._render.setAttribute(this._ref.nativeElement, 'width', '32');
            this._render.setAttribute(this._ref.nativeElement, 'height', '32');
        });
    }

}

@Component({
    selector: 'octopus-chip',
    template: `
        <div class="octopus-chip-wrapper" octopus-ripple>
            <ng-content select="img[octopus-chip-icon]"></ng-content>
            <span class="octopus-chip-text">
                <ng-content></ng-content>
            </span>
            <button octopus-icon-button [color]="color" (click)="remove.emit()" *ngIf="formatBoolean(removable)">
                <octopus-icon margin="0" size="16">close</octopus-icon>
            </button>
        </div>    
    `
})
export class OctopusChip implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('removable') removable: boolean | string = false;

    @Output('remove') remove: EventEmitter<MouseEvent> = new EventEmitter();

    @ContentChild(OctopusChipIcon) icon!: OctopusChipIcon;

    @HostBinding('class') class: string = 'octopus-chip';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    formatBoolean(flag: boolean | string): boolean {
        return coerceBooleanProperty(flag);
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-chip' : `octopus-${prevColor}-chip`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-chip`);
    }

}

@Component({
    selector: 'octopus-chip-stack',
    template: `
        <div class="octopus-chip-stack-wrapper">
            <ng-content select="octopus-chip"></ng-content>
        </div>
    `
})
export class OctopusChipStack {

    @HostBinding('class') class: string = 'octopus-chip-stack';

}