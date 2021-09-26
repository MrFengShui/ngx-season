import { AnimationMetadata, trigger, state, style, transition, animate } from "@angular/animations";
import { CdkAccordion, CdkAccordionItem } from "@angular/cdk/accordion";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";

import { ColorPalette } from "src/app/global/enum.utils";

const ICON_ROTATE: AnimationMetadata = trigger('ICON_ROTATE', [
    state('up', style({
        transform: 'rotate(180deg)'
    })),
    state('down', style({
        transform: 'rotate(0deg)'
    })),
    transition('up => down', [animate('250ms ease-in-out')]),
    transition('down => up', [animate('250ms ease-in-out')])
]);

const CONTENT_COLLAPSE: AnimationMetadata = trigger('CONTENT_COLLAPSE', [
    state('show', style({
        visibility: 'visible'
    })),
    state('hide', style({
        height: 0,
        visibility: 'hidden'
    })),
    transition('show => hide', [animate('250ms ease-in-out')]),
    transition('hide => show', [animate('250ms ease-in-out')])
]);

@Component({
    selector: 'octopus-expansion-panel-content',
    template: `
        <div class="octopus-expansion-panel-content-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusExpansionPanelContent {

    @HostBinding('class') class: string = 'octopus-expansion-panel-content';

}

@Component({
    selector: 'octopus-expansion-panel-addon',
    template: `
        <div class="octopus-expansion-panel-addon-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusExpansionPanelAddon {

    @HostBinding('class') class: string = 'octopus-expansion-panel-addon';

}

@Component({
    selector: 'octopus-expansion-panel',
    template: `
        <div class="octopus-expansion-panel-wrapper" #wrapper>
            <div class="octopus-expansion-panel-head" octopus-ripple (click)="toggle()">
                <ng-content select="octopus-icon"></ng-content>
                <span class="octopus-expansion-subject" style="white-space: nowrap;">{{subject}}</span>
                <span class="octopus-expansion-description flex-fill text-truncate">{{description}}</span>
                <octopus-icon rounded="true" [@ICON_ROTATE]="expanded ? 'up' : 'down'" #control>expand_circle_down
                </octopus-icon>
            </div>
            <div class="octopus-expansion-panel-body" [@CONTENT_COLLAPSE]="expanded ? 'show' : 'hide'">
                <ng-content select="octopus-expansion-panel-content" *ngIf="contents.length === 1"></ng-content>
                <div octopus-divider class="my-0" *ngIf="addons.length === 1"></div>
                <ng-content select="octopus-expansion-panel-addon" *ngIf="addons.length === 1"></ng-content>
            </div>
        </div>
    `,
    animations: [CONTENT_COLLAPSE, ICON_ROTATE]
})
export class OctopusExpansionPanel extends CdkAccordionItem implements OnDestroy, AfterContentInit, AfterViewInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('subject') subject: string = '';
    @Input('description') description: string = '';

    @ContentChildren(OctopusExpansionPanelContent) contents!: QueryList<OctopusExpansionPanelContent>;

    @ContentChildren(OctopusExpansionPanelAddon) addons!: QueryList<OctopusExpansionPanelAddon>;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-expansion-panel';

    private subscription!: Subscription;

    constructor(
        private _cdr: ChangeDetectorRef,
        private _usd: UniqueSelectionDispatcher,
        private _ref: ElementRef,
        private _render: Renderer2,
        private _vcr: ViewContainerRef,
        @Inject(forwardRef(() => OctopusExpansion))
        private _expansion: OctopusExpansion
    ) {
        super(_expansion, _cdr, _usd);
    }

    ngAfterContentInit() {
        if (this.contents.length > 1) {
            throw new Error('Multiple OctopusExpansionPanelContents are not allowed to add into OctopusExpansionPanel');
        }

        if (this.addons.length > 1) {
            throw new Error('Multiple OctopusExpansionPanelAddons are not allowed to add into OctopusExpansionPanel');
        }
    }

    ngAfterViewInit() {
        this.subscription = this.expandedChange.asObservable().subscribe(value => {
            if (value) {
                this._render.addClass(this._ref.nativeElement, 'expanded');
            } else {
                this._render.removeClass(this._ref.nativeElement, 'expanded');
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'octopus-expansion',
    template: `
        <div cdkAccordion class="octopus-expansion-wrapper">
            <ng-content select="octopus-expansion-panel"></ng-content>
        </div>
    `
})
export class OctopusExpansion extends CdkAccordion implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('index') index: number | string = -1;

    @ContentChildren(OctopusExpansionPanel)
    private panels!: QueryList<OctopusExpansionPanel>;

    @HostBinding('class') class: string = 'octopus-expansion';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.index !== undefined) {
            setTimeout(() => this.renderIndex(coerceNumberProperty(changes.index.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderIndex(coerceNumberProperty(this.index));
        });
    }

    private renderIndex(index: number): void {
        if (index !== -1) {
            this.panels.get(index)?.open();
        }
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? `octopus-primary-expansion` : `octopus-${prevColor}-expansion`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-expansion`);
    }

}
