import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

type Alignment = 'start' | 'center' | 'end';
type Position = 'top' | 'bottom';

@Component({
    selector: 'octopus-tabbed-unit',
    template: `<ng-template #wrapper><ng-content></ng-content></ng-template>`
})
export class OctopusTabbedUnit {

    @Input('icon') icon: string = '';
    @Input('text') text: string = '';

    @ViewChild('wrapper', { read: TemplateRef }) content!: TemplateRef<any>;

}

@Component({
    animations: [
        trigger('MOVE', [
            state('show', style({
                transform: 'translateX(0%)'
            })),
            state('hide', style({
                transform: 'translateX(100%)'
            })),
            transition('show => hide', animate('1000ms ease-in-out')),
            transition('hide => show', animate('1000ms ease-in-out'))
        ])
    ],
    selector: 'octopus-tabbed',
    template: `
        <div class="octopus-tabbed-wrapper" #wrapper>
            <div class="octopus-tabbed-control"#control>
                <button octopus-button (click)="handleScrollActionEvent(content, -1)" *ngIf="content.scrollWidth > control.scrollWidth">
                    <octopus-icon>navigate_before</octopus-icon>
                </button>
                <div class="octopus-tabbed-control-tabs" #content>
                    <a octopus-button class="octopus-tabbed-control-tab text-truncate" [class.active]="i === selectedIndex" 
                        (click)="selectedIndex = i" *ngFor="let unit of units; index as i">
                        <octopus-icon margin="4" rounded="true" *ngIf="unit.icon.length !== 0">{{unit.icon}}</octopus-icon>
                        <span *ngIf="unit.text.length !== 0">{{unit.text}}</span>
                    </a>
                </div>
                <button octopus-button (click)="handleScrollActionEvent(content, 1)" *ngIf="content.scrollWidth > control.scrollWidth">
                    <octopus-icon>navigate_next</octopus-icon>
                </button>
            </div>
            <div class="octopus-tabbed-content">
                <div [class.d-none]="i !== selectedIndex" [@MOVE]="i === selectedIndex ? 'show' : 'hide'" *ngFor="let unit of units; index as i">
                    <ng-container [ngTemplateOutlet]="unit.content"></ng-container>
                </div>
            </div>
        </div>
        <ng-template><ng-content select="octopus-tabbed-unit"></ng-content></ng-template>
    `
})
export class OctopusTabbed implements OnChanges, OnInit {

    @Input('alignment') align: Alignment = 'start';
    @Input('color') color: ColorPalette = 'base';
    @Input('position') position: Position = 'top';
    @Input('selectedIndex') selectedIndex: number | string = 0;

    @ContentChildren(OctopusTabbedUnit) units!: QueryList<OctopusTabbedUnit>;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @ViewChild('control', { read: ElementRef, static: true })
    private control!: ElementRef<HTMLElement>;

    @ViewChild('content', { read: ElementRef, static: true })
    private content!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-tabbed';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.align !== undefined) {
            setTimeout(() => this.renderAlign(changes.align.previousValue, changes.align.currentValue));
        }

        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.previousValue, changes.position.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderAlign(undefined, this.align);
            this.renderColor(undefined, this.color);
            this.renderPosition(undefined, this.position);
        });
    }

    handleScrollActionEvent(element: HTMLElement, flag: number): void {
        if (flag === -1) {
            let value: number = element.scrollLeft - 240;

            if (value < 0) {
                element.scrollTo({ left: 0 });
            } else {
                element.scrollTo({ left: value });
            }
        }

        if (flag === 1) {
            let value: number = element.scrollLeft + 240;

            if (value > element.scrollWidth) {
                element.scrollTo({ left: element.scrollWidth - element.clientWidth });
            } else {
                element.scrollTo({ left: value });
            }
        }
    }

    private renderAlign(prevAlign: Alignment | undefined, currAlign: Alignment): void {
        this._render.removeClass(this.content.nativeElement, prevAlign === undefined ? 'justify-content-start' : `justify-content-${prevAlign}`);
        this._render.addClass(this.content.nativeElement, this.content.nativeElement.offsetWidth <= this.control.nativeElement.offsetWidth
            ? `justify-content-${currAlign}` : 'justify-content-start');
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-tabbed' : `octopus-${prevColor}-tabbed`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-tabbed`);
    }

    private renderPosition(prevPos: Position | undefined, currPos: Position): void {
        this._render.removeClass(this.wrapper.nativeElement, prevPos === undefined ? 'top' : `${prevPos}`);
        this._render.addClass(this.wrapper.nativeElement, `${currPos}`);
        this._render.removeClass(this.control.nativeElement, prevPos === undefined ? 'top' : `${prevPos}`);
        this._render.addClass(this.control.nativeElement, `${currPos}`);
    }

}
