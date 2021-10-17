import { animate, state, style, transition, trigger } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { CdkOverlayOrigin, ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, InjectionToken, Injector, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { interval, Subject, Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { AbstractOctopusComponent } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

class OctopusSelectInjector {

    color: ColorPalette;
    groups: QueryList<OctopusSelectOptionGroup>;
    options: QueryList<OctopusSelectOption>;
    lines: number;
    selected: any;

    constructor(
        private _color: ColorPalette,
        private _groups: QueryList<OctopusSelectOptionGroup>,
        private _options: QueryList<OctopusSelectOption>,
        private _lines: number,
        private _selected: any
    ) {
        this.color = this._color;
        this.groups = this._groups;
        this.options = this._options;
        this.lines = this._lines;
        this.selected = this._selected;
    }

}

const OCTOPUS_SELECT_INJECTOR_DATA: InjectionToken<OctopusSelectInjector> = new InjectionToken('OctopusSelectInjectorData');

@Component({
    selector: 'octopus-select-option',
    template: `<ng-content></ng-content>`
})
export class OctopusSelectOption {

    @Input('value') value: any;

    @HostBinding('class') class: string = 'octopus-select-option';

    constructor(
        private _ref: ElementRef,
        @Inject(forwardRef(() => OctopusSelect))
        private _select: OctopusSelect
    ) { }

    copyHTML(): string {
        return this._ref.nativeElement.innerHTML;
    }

    select(): void {
        this._select.updateSelect(this.value, this.copyHTML());
        this._select.state$.next(false);
    }

}

@Component({
    selector: 'octopus-select-option-group',
    template: `<ng-content select="octopus-select-option"></ng-content>`
})
export class OctopusSelectOptionGroup {

    @Input('label') label: string = '';

    @ContentChildren(OctopusSelectOption) options!: QueryList<OctopusSelectOption>;

    @HostBinding('class') class: string = 'octopus-select-option-group';

}

@Component({
    selector: 'octopus-select-dropdown',
    template: `
        <octopus-list>
            <octopus-list-item *ngFor="let option of options">
                <a class="octopus-select-option" [class.active]="select !== undefined && option.value == select" [innerHTML]="option.copyHTML()" (click)="option.select()"></a>
            </octopus-list-item>
            <ng-container *ngFor="let group of groups">
                <span octopus-list-headline>{{group.label}}</span>
                <octopus-list-item *ngFor="let option of group.options">
                    <a class="octopus-select-option pl-200" [class.active]="select !== undefined && option.value == select" [innerHTML]="option.copyHTML()" (click)="option.select()"></a>
                </octopus-list-item>
            </ng-container>
        </octopus-list>
    `
})
export class OctopusSelectDropdown implements OnInit, AfterViewInit {

    @HostBinding('class') class: string = 'octopus-select-dropdown';

    groups!: QueryList<OctopusSelectOptionGroup>;
    options!: QueryList<OctopusSelectOption>;
    select!: any;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(OCTOPUS_SELECT_INJECTOR_DATA)
        private _data: OctopusSelectInjector
    ) { }

    ngOnInit() {
        this.groups = this._data.groups;
        this.options = this._data.options;
        this.select = this._data.selected;
    }

    ngAfterViewInit() {
        this._render.addClass(this._ref.nativeElement, 'overflow-auto');
        this._render.addClass(this._ref.nativeElement, 'overflow');
        this._render.setStyle(this._ref.nativeElement, 'max-height', `calc(2.5rem * ${this._data.lines})`);
    }

}

@Component({
    animations: [
        trigger('ICON_ROTATE', [
            state('up', style({ transform: 'rotate(180deg)' })),
            state('down', style({ transform: 'rotate(0deg)' })),
            transition('up => down', animate('250ms ease-in-out')),
            transition('down => up', animate('250ms ease-in-out'))
        ])
    ],
    selector: 'octopus-select',
    template: `
        <div class="octopus-select-wrapper" cdkOverlayOrigin #origin="cdkOverlayOrigin">
            <div class="octopus-select-content" [innerHTML]="html" *ngIf="!initial"></div>
            <div octopus-divider *ngIf="select === undefined && initial">{{placeholder}}</div>
            <octopus-icon size="24" [@ICON_ROTATE]="(state$ | async) ? 'up' : 'down'" class="ml-25">expand_circle_down</octopus-icon>
        </div>
        <ng-template><ng-content select="octopus-select-option, octopus-select-option-group"></ng-content></ng-template>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusSelect),
        multi: true
    }]
})
export class OctopusSelect extends AbstractOctopusComponent implements ControlValueAccessor, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('color') color: ColorPalette = 'primary';

    @Input('lines')
    get lines(): any { return this._lines; }
    set lines(_lines: any) { this._lines = coerceNumberProperty(_lines); }
    private _lines: any = 8;

    @Input('placeholder') placeholder: string = 'Select One';
    @Input('select') select: any;

    @Output('selectChange') selectChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('origin', { read: CdkOverlayOrigin, static: true })
    private origin!: CdkOverlayOrigin;

    @ContentChildren(OctopusSelectOption)
    private options!: QueryList<OctopusSelectOption>;

    @ContentChildren(OctopusSelectOptionGroup)
    private groups!: QueryList<OctopusSelectOptionGroup>;

    @HostBinding('class') class: string = 'octopus-select';

    @HostListener('click')
    private listenHostClick(): void {
        this.state$.next(true);
    }

    state$: Subject<boolean> = new Subject();
    html!: SafeHtml;
    initial: boolean = true;

    private ref!: OverlayRef;
    private stateSub!: Subscription;
    private updateSub!: Subscription;
    private eventSub!: Subscription;

    constructor(
        protected _sanitizer: DomSanitizer,
        protected _ref: ElementRef,
        protected _injector: Injector,
        protected _overlay: Overlay,
        protected _render: Renderer2,
        protected _vcr: ViewContainerRef
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.select !== undefined) {
            setTimeout(() => {
                this.updateHTML(this.options, changes.select.currentValue);
                this.groups.forEach(group => this.updateHTML(group.options, changes.select.currentValue));
            });
        }
    }

    ngAfterContentInit() {
        this.updateHTML(this.options, this.select);
        this.groups.forEach(group => this.updateHTML(group.options, this.select));
    }

    ngAfterViewInit() {
        this.stateSub = this.state$.asObservable().subscribe(value => value ? this.show() : this.hide());
    }

    ngOnDestroy() {
        if (this.stateSub !== undefined && !this.stateSub.closed) {
            this.stateSub.unsubscribe();
        }

        if (this.eventSub !== undefined && !this.eventSub.closed) {
            this.eventSub.unsubscribe();
        }

        if (this.updateSub !== undefined && !this.updateSub.closed) {
            this.updateSub.unsubscribe();
        }

        this.state$.complete();
    }

    writeValue(value: any): void {
        if (value !== null) {
            this.updateSelect(value);
            this.updateHTML(this.options, value);
            this.groups.forEach(group => this.updateHTML(group.options, value));
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void { }

    onChange!: (_: any) => void;
    onTouched!: () => void;

    updateSelect(select: any, html: string = ''): void {
        this.select = select;
        this.selectChange.emit(this.select);

        if (this.onChange !== undefined) {
            this.onChange(select);
        }

        this.html = this._sanitizer.bypassSecurityTrustHtml(html);
        this.initial = false;
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-select' : `octopus-${prevColor}-select`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-select`);
    }

    private updateHTML(options: QueryList<OctopusSelectOption>, value: any): void {
        this.initial = value === undefined;
        let option = options.find(option => option.value == value);

        if (option !== undefined) {
            this.html = this._sanitizer.bypassSecurityTrustHtml(option.copyHTML());
        }
    }

    private create(): void {
        let positions: ConnectedPosition[] = [
            { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
            { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' }
        ];
        let positionStrategy: FlexibleConnectedPositionStrategy = this._overlay.position().flexibleConnectedTo(this.origin.elementRef)
            .withPositions(positions);
        let scrollStrategy: any = this._overlay.scrollStrategies.close();
        this.ref = this._overlay.create({
            panelClass: ['octopus-select-overlay', `octopus-${this.color}-select-overlay`],
            positionStrategy, scrollStrategy,
            width: this.origin.elementRef.nativeElement.clientWidth
        });
    }

    private show(): void {
        this.create();
        this.ref.attach(new ComponentPortal(OctopusSelectDropdown, this._vcr, Injector.create({
            parent: this._injector,
            providers: [
                {
                    provide: OCTOPUS_SELECT_INJECTOR_DATA,
                    useValue: {
                        color: this.color,
                        groups: this.groups,
                        options: this.options,
                        lines: this.lines,
                        selected: this.select
                    }
                }
            ]
        })));
        this.updateSub = interval(250).pipe(take(10)).subscribe(() => this.ref.updatePosition());
        this.eventSub = this.ref.outsidePointerEvents().subscribe(event => this.state$.next(false));
    }

    private hide(): void {
        if (this.ref.hasAttached()) {
            this.ref.detach();
            this.ref.dispose();
            this.eventSub.unsubscribe();
        }
    }

}

