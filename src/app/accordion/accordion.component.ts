import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component, ContentChildren,
    Directive,
    ElementRef, forwardRef,
    HostBinding, Inject, InjectionToken,
    Input, NgZone, OnChanges, Optional, QueryList, Renderer2, SimpleChanges, SkipSelf,
    ViewChild
} from "@angular/core";
import {CdkAccordion, CdkAccordionItem} from "@angular/cdk/accordion";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {UniqueSelectionDispatcher} from "@angular/cdk/collections";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {Subscription} from "rxjs";

import {OctopusColorPalette} from "../global/enums.utils";

export const OCTOPUS_ACCORDION: InjectionToken<OctopusAccordion> =
    new InjectionToken<OctopusAccordion>('OCTOPUS_ACCORDION');
export const OCTOPUS_ACCORDION_PANEL: InjectionToken<OctopusAccordionPanel> =
    new InjectionToken<OctopusAccordionPanel>('OCTOPUS_ACCORDION_PANEL');

@Directive({
    selector: 'octo-icon[octo-accordion-thumb], img[octo-accordion-thumb]'
})
export class OctopusAccordionThumbnail {

    @HostBinding('class') class: string = 'octo-accordion-thumb';

}

@Component({
    selector: 'octo-accordion-panel',
    template: `
        <ng-container *ngIf="thumbs.length <= 1">
            <div class="octo-accordion-panel-wrapper sx-50" (click)="toggle()">
                <ng-content select="octo-icon[octo-accordion-thumb], img[octo-accordion-thumb]"></ng-content>
                <div class="octo-panel-text-wraper">
                    <span class="octo-panel-sub" *ngIf="subject.trim().length > 0">{{subject}}</span>
                    <span class="octo-panel-desc" *ngIf="description.trim().length > 0">{{description}}</span>
                </div>
                <button octo-btn [octoColor]="_accordion.color" octoShape="ring" style="width: 2.5rem;height: 2.5rem;"
                        (click)="$event.stopPropagation();toggle();" #dropdown>
                    <octo-icon octoSize="2rem">arrow_drop_down_circle</octo-icon>
                </button>
            </div>
            <div class="octo-accordion-panel-content" #content><ng-content></ng-content></div>
        </ng-container>
    `,
    providers: [
        {provide: OCTOPUS_ACCORDION, useValue: undefined},
        {provide: OCTOPUS_ACCORDION_PANEL, useValue: OctopusAccordionPanel}
    ]
})
export class OctopusAccordionPanel extends CdkAccordionItem implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('octoSub') subject: string = '';
    @Input('octoDesc') description: string = '';

    @ContentChildren(OctopusAccordionThumbnail) thumbs!: QueryList<OctopusAccordionThumbnail>;

    @ViewChild('dropdown', {read: ElementRef})
    private dropdown!: ElementRef;

    @ViewChild('content', {read: ElementRef})
    private content!: ElementRef;

    @HostBinding('class') class: string = 'octo-accordion-panel';

    private subscriptions: Subscription[] = [];

    constructor(
        @Optional() @SkipSelf() @Inject(OCTOPUS_ACCORDION_PANEL)
        accordion: OctopusAccordion,
        _changeDetectorRef: ChangeDetectorRef,
        _expansionDispatcher: UniqueSelectionDispatcher,
        @Inject(forwardRef(() => OctopusAccordion))
        public _accordion: OctopusAccordion,
        private _builder: AnimationBuilder,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
        super(accordion, _changeDetectorRef, _expansionDispatcher);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['expanded']) {
            this.createContentAnimate(changes['expanded'].currentValue);
        }
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.forEach(subscription => {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
    }

    ngAfterContentInit() {
        if (this.thumbs && this.thumbs.length > 1) {
            throw new Error();
        }
    }

    ngAfterViewInit() {
        this.createContentAnimate(this.expanded);
        this.createDropdownAnimate(this.expanded);
        this.listenStateChange();
    }

    override toggle() {
        if (this._accordion.multi) {
            super.toggle();
        } else {
            super.toggle();
            this._accordion.panels.filter(panel => panel.id !== this.id).forEach(panel => panel.close());
        }
    }

    private listenStateChange(): void {
        this._zone.runOutsideAngular(() => {
            let openSub = this.opened.asObservable().subscribe(() => {
                this.createContentAnimate(true);
                this.createDropdownAnimate(true);
            });
            let closeSub = this.closed.asObservable().subscribe(() => {
                this.createContentAnimate(false);
                this.createDropdownAnimate(false);
            });
            this.subscriptions.push(openSub, closeSub);
        });
    }

    private createContentAnimate(expended: boolean): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({height: expended ? 0 : `${this.content.nativeElement.scrollHeight}px`}),
            animate(`${coerceNumberProperty(this._accordion.period)}ms linear`,
                style({height: expended ? `${this.content.nativeElement.scrollHeight}px` : 0}))
        ]).create(this.content.nativeElement);
        player.onDone(() => player = null);
        player.play();
    }

    private createDropdownAnimate(expended: boolean): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: `rotate(${expended ? 0 : 180}deg)`}),
            animate(`${coerceNumberProperty(this._accordion.period)}ms linear`,
                style({transform: `rotate(${expended ? 180 : 0}deg)`}))
        ]).create(this.dropdown.nativeElement);
        player.onDone(() => player = null);
        player.play();
    }

}

@Component({
    selector: 'octo-accordion',
    template: `<ng-content select="octo-accordion-panel"></ng-content>`,
    providers: [
        { provide: OCTOPUS_ACCORDION, useValue: OctopusAccordion }
    ]
})
export class OctopusAccordion extends CdkAccordion {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @Input('octoPeriod')
    get period() { return this._period; }
    set period(_period: any) { this._period = coerceNumberProperty(_period); }
    private _period: number = 250;

    @ContentChildren(OctopusAccordionPanel) panels!: QueryList<OctopusAccordionPanel>;

    @HostBinding('class') class: string = 'octo-accordion octo-shadow-4';

}
