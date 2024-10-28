import { AnimationBuilder, AnimationPlayer, style, animate } from "@angular/animations";
import { CdkAccordionItem, CDK_ACCORDION } from "@angular/cdk/accordion";
import { coerceNumberProperty, coerceBooleanProperty } from "@angular/cdk/coercion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { TemplatePortal } from "@angular/cdk/portal";
import { Directive, TemplateRef, Component, ChangeDetectionStrategy, AfterViewInit, AfterContentInit, Input, ViewChild, ElementRef, ContentChild, ChangeDetectorRef, Renderer2, NgZone, ViewContainerRef, Inject } from "@angular/core";
import { PBKDF2, HmacSHA256 } from "crypto-js";
import { Observable, Subscription } from "rxjs";

import * as moment from "moment";

import { NGXSeasonAccordionColor, NGXSeasonAccordionComponent } from "./accordion.component";

@Directive({
    selector: '[ngx-sui-AccordionBlockHeader]'
})
export class NGXSeasonAccordionBlockHeaderDirective {

    constructor(protected _template: TemplateRef<any>) { }

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-AccordionBlockContent]'
})
export class NGXSeasonAccordionBlockContentDirective {

    constructor(protected _template: TemplateRef<any>) { }

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-accordion-block',
    template: `
        <div class="block-header">
            <button ngx-sui-Button [btnColor]="color$ | async" [btnIcon]="ctrlIcon" btnIconOnly="true" btnCircled="true" class="block-header-ctrlbtn" (click)="multiple ? toggle() : singleToggle()" #blockControl></button>
            <div class="block-header-wrapper">
                <span class="block-header-text-wrapper" *ngIf="title">{{ title }}</span>
                <ng-template [cdkPortalOutlet]="blockHeaderPortal"></ng-template>
            </div>
        </div>
        <div class="block-content" #blockContent><ng-template [cdkPortalOutlet]="blockContentPortal"></ng-template></div>
    `
})
export class NGXSeasonAccordionBlockComponent extends CdkAccordionItem implements AfterViewInit, AfterContentInit {

    @Input('accordionCtrlIcon')
    set ctrlIcon(ctrlIcon: string) {
        this._ctrlIcon = ctrlIcon;
    }

    get ctrlIcon(): string {
        return this._ctrlIcon;
    }

    @Input('accordionDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('accordionTitle')
    set title(title: string | undefined) {
        this._title = title;
    }

    get title(): string | undefined {
        return this._title;
    }

    @Input('accordionToggled')
    set toggled(toggled: boolean | string) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    private _ctrlIcon: string = 'angle-double';
    private _duration: number = 125;
    private _title: string | undefined;
    private _toggled: boolean = false;

    @ViewChild('blockControl', { read: ElementRef, static: true })
    protected blockControl: ElementRef<HTMLElement> | undefined;

    @ViewChild('blockContent', { read: ElementRef, static: true })
    protected blockContent: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonAccordionBlockHeaderDirective, { read: TemplateRef, static: true })
    protected blockHeaderTemplate: TemplateRef<any> | undefined;

    @ContentChild(NGXSeasonAccordionBlockContentDirective, { read: TemplateRef, static: true })
    protected blockContentTemplate: TemplateRef<any> | undefined;

    override id: string = this.generateAccordionBlockID();

    protected color$: Observable<NGXSeasonAccordionColor> | null = null;

    protected blockHeaderPortal: TemplatePortal | undefined;
    protected blockContentPortal: TemplatePortal | undefined;
    protected multiple: boolean = false;

    private openCloseAll$: Subscription = Subscription.EMPTY;
    private ctrlIcon$: Subscription = Subscription.EMPTY;
    private multiple$: Subscription = Subscription.EMPTY;
    private dispatcher$: () => void = () => { };

    constructor(
        protected _builder: AnimationBuilder,
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,
        protected _vcr: ViewContainerRef,
        protected _usd: UniqueSelectionDispatcher,

        @Inject(CDK_ACCORDION)
        protected _accordion: NGXSeasonAccordionComponent
    ) {
        super(_accordion, _cdr, _usd);
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.openCloseAll$.unsubscribe();
        this.ctrlIcon$.unsubscribe();
        this.multiple$.unsubscribe();
        this.dispatcher$();
    }

    ngAfterViewInit(): void {
        this.initialize();
        this.listenCtrlIconChange();
        this.listenMultipleChange();
        this.listenOpenCloseAllChange();
        this.listenSelectionDispatcher();
    }

    ngAfterContentInit(): void {
        if (this.blockHeaderTemplate) this.blockHeaderPortal = new TemplatePortal(this.blockHeaderTemplate, this._vcr);

        if (this.blockContentTemplate) this.blockContentPortal = new TemplatePortal(this.blockContentTemplate, this._vcr);
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'accordion-block');
        this._renderer.setAttribute(element, 'data-accordion-block-id', this.id);

        this.color$ = this._accordion.color$.asObservable();

        let task = setTimeout(() => {
            clearTimeout(task);

            const blockContentElement: HTMLElement = this.blockContent?.nativeElement as HTMLElement;
            this._renderer.setAttribute(blockContentElement, 'data-accordion-block-content-size', `${blockContentElement.offsetHeight}`);

            this.setupAccordionBlockToggled(this.toggled);
        });
    }

    override open(): void {
        this.toggled = true;
        this.setupAccordionBlockToggled(this.toggled);
    }

    override close(): void {
        this.toggled = false;
        this.setupAccordionBlockToggled(this.toggled);
    }

    override toggle(): void {
        this.toggled = !this.toggled;
        this.setupAccordionBlockToggled(this.toggled);
    }

    singleToggle(): void {
        this._usd.notify(this.id, this._accordion.id);
    }

    public fetchAccordionID(): Promise<string | null> {
        return new Promise(resolve => {
            let task = setTimeout(() => {
                clearTimeout(task);

                const parent: HTMLElement = this._renderer.parentNode(this._element.nativeElement);
                const id: string | null = parent.getAttribute('data-accordion-block-id');
                resolve(id);
            });
        });
    }

    protected setupAccordionBlockToggled(toggled: boolean): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-block-state', toggled ? 'expanded' : 'collapsed');

        this.createBlockControlAnimation(this.blockControl?.nativeElement, this.duration, toggled);

        const blockContentElement: HTMLElement = this.blockContent?.nativeElement as HTMLElement;
        const value: string | null = blockContentElement.getAttribute('data-accordion-block-content-size');
        const height: number = Number.parseInt(value as string);
        this.createBlockContentAnimation(blockContentElement, this.duration, toggled, height);
    }

    private listenSelectionDispatcher(): void {
        this._ngZone.runOutsideAngular(() =>
            this.dispatcher$ = this._usd.listen((id: string, accordionID: string) =>
                this._ngZone.run(() => {
                    if (this._accordion && this._accordion.id === accordionID) {
                        if (this.id === id) {
                            this.open();
                        } else {
                            this.close();
                        }
                    }
                })));
    }

    private listenOpenCloseAllChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.openCloseAll$ = this._accordion._openCloseAllActions.asObservable()
                .subscribe(value =>
                    this._ngZone.run(() => {
                        if (value) {
                            this.open();
                        } else {
                            this.close();
                        }
                    })));
    }

    private listenCtrlIconChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.ctrlIcon$ = this._accordion.ctrlIcon$.asObservable()
                .subscribe(value =>
                    this._ngZone.run(() => this.ctrlIcon = this.ctrlIcon === 'angle-double' ? value : this.ctrlIcon)));
    }

    private listenMultipleChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.multiple$ = this._accordion.multiple$.asObservable()
                .subscribe(value =>
                    this._ngZone.run(() => this.multiple = value)));
    }

    private createBlockControlAnimation(element: HTMLElement | undefined, duration: number, toggled: boolean): void {
        if (element === undefined) throw new Error();

        let player: AnimationPlayer | null = this._builder.build([
            style({ rotate: toggled ? '90deg' : '180deg' }),
            animate(`${duration}ms`, style({ rotate: toggled ? '180deg' : '90deg' }))
        ]).create(element);
        player.onStart(() => this._renderer.setStyle(element, 'rotate', toggled ? '90deg' : '180deg'));
        player.onDone(() => {
            this._renderer.setStyle(element, 'rotate', toggled ? '180deg' : '90deg');
            player?.destroy();
        });
        player.onDestroy(() => player = null);
        player.play();
    }

    private createBlockContentAnimation(element: HTMLElement | undefined, duration: number, flag: boolean, height: number): void {
        if (element === undefined) throw new Error();

        let player: AnimationPlayer | null = this._builder.build([
            style({ height: flag ? '0px' : `${height}px` }),
            animate(`${duration}ms`, style({ height: flag ? `${height}px` : '0px' }))
        ]).create(element);
        player.onStart(() => this._renderer.setStyle(element, 'height', flag ? '0px' : `${height}px`));
        player.onDone(() => {
            this._renderer.setStyle(element, 'height', flag ? `${height}px` : '0px');
            player?.destroy();
        });
        player.onDestroy(() => player = null);
        player.play();
    }

    private generateAccordionBlockID(): string {
        const password: string = 'ngx-sui-accordion-block';
        const salt: string = `${password}_${moment().format('x')}`;
        const key: string = PBKDF2(password, salt, { keySize: 256, iterations: 1024 }).toString();
        return HmacSHA256(salt, key).toString();
    }

}
