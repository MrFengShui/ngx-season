import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

import { ColorPalette } from "src/app/global/enum.utils";

type Direction = 'horizontal' | 'vertical';

@Component({
    selector: 'octopus-roll-unit',
    template: ''
})
export class OctopusRollUnit {

    @Input('source') source: string = '';

}

@Component({
    selector: 'octopus-roll',
    template: `
        <div class="octopus-roll-wrapper">
            <button octopus-icon-button [color]="color" class="head" [disabled]="(disabled$ | async)?.left" (click)="handleSwitchActionEvent(-1)">
                <octopus-icon size="48">keyboard_arrow_left</octopus-icon>
            </button>
            <button octopus-icon-button [color]="color" class="tail" [disabled]="(disabled$ | async)?.right" (click)="handleSwitchActionEvent(1)">
                <octopus-icon size="48">keyboard_arrow_right</octopus-icon>
            </button>
            <div class="octopus-roll-stack" #stack>
                <img [src]="unit.source" [alt]="'unit_' + (i + 1)" class="octopus-roll-unit" *ngFor="let unit of units; index as i">
            </div>
        </div>
        <ng-template><ng-content select="octopus-roll-unit"></ng-content></ng-template>
    `
})
export class OctopusRoll implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    @Input('size')
    get size(): any { return this._size; }
    set size(_size: any) { this._size = coerceNumberProperty(_size); }
    private _size: any = 240;

    @ContentChildren(OctopusRollUnit) units!: QueryList<OctopusRollUnit>;

    @ViewChild('stack', { read: ElementRef, static: true })
    private stack!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-roll';

    disabled$: Subject<{ left: boolean, right: boolean }> = new Subject();

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(changes.size.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderSize(this.size);
            this.disabled$.next({ left: true, right: false });
        });
    }

    handleSwitchActionEvent(flag: number): void {
        let offset: number = this.stack.nativeElement.scrollLeft;
        this.disabled$.next({ left: false, right: false });

        if (flag === -1) {
            offset -= 240;

            if (offset <= 0) {
                offset = 0;
                this.disabled$.next({ left: true, right: false });
            }
        }

        if (flag === 1) {
            offset += 240;
            let difference: number = this.stack.nativeElement.scrollWidth - this.stack.nativeElement.clientWidth;

            if (offset >= difference) {
                offset = difference;
                this.disabled$.next({ left: false, right: true });
            }
        }

        this.stack.nativeElement.scrollTo({ left: offset });
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-roll' : `octopus-${prevColor}-roll`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-roll`);
    }

    private renderSize(size: number): void {
        this._render.setStyle(this.stack.nativeElement, 'height', `${size}px`);
    }

}