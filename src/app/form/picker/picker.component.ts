import { trigger, state, style, transition, animate } from "@angular/animations";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, InjectionToken, Injector, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { interval, Observable, of, Subject, Subscription } from "rxjs";

import { OctopusCalendar } from "src/app/components/calendar/calendar.component";
import { OctopusRange } from "../range/range.component";

import { AbstractOctopusComponent, AbstractOctopusInput } from "src/app/global/base.utils";
import { ColorPalette, OctopusFileType } from "src/app/global/enum.utils";

class OctopusDataPickerInjector {

    color: ColorPalette;
    value: Date;

    constructor(
        private _color: ColorPalette,
        private _value: Date
    ) {
        this.color = this._color;
        this.value = this._value;
    }

}

const OCTOPUS_DATE_PICKER_INJECTOR_DATA: InjectionToken<OctopusDataPickerInjector> = new InjectionToken('OctopusDatePickerInjectorData');

export class OctopusColorValue {

    hex: string;
    rgb: { red: number, green: number, blue: number };
    alpha: number;

    constructor(
        private _hex: string,
        private _rgb: { red: number, green: number, blue: number },
        private _alpha: number
    ) {
        this.hex = this._hex;
        this.rgb = this._rgb;
        this.alpha = this._alpha;
    }

}

export class OctopusBlobValue {

    file: File;
    blob: any;

    constructor(
        private _file: File,
        private _blob: any
    ) {
        this.file = this._file;
        this.blob = this._blob;
    }

}

@Component({
    selector: 'octopus-date-picker-dropdown',
    template: `<octopus-calendar [color]="color" [date]="date" #calendar></octopus-calendar>`
})
export class OctopusDatePickerDropdown implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('calendar', { read: OctopusCalendar })
    private calendar!: OctopusCalendar;

    @HostBinding('class') class: string = 'octopus-date-picker-dropdown';

    color!: ColorPalette;
    date!: Date;

    private subscription!: Subscription;

    constructor(
        @Inject(OCTOPUS_DATE_PICKER_INJECTOR_DATA)
        private _data: OctopusDataPickerInjector,
        @Inject(forwardRef(() => OctopusDatePicker))
        private _picker: OctopusDatePicker
    ) { }

    ngOnInit() {
        this.color = this._data.color;
        this.date = this._data.value;
    }

    ngAfterViewInit() {
        this.subscription = this.calendar.dateChange.asObservable().subscribe(value => {
            this._picker.updateChange(value);
            this._picker.state$.next(false);
        });
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
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
    selector: 'octopus-date-picker',
    template: `
        <div class="octopus-date-picker-wrapper" cdkOverlayOrigin #origin="cdkOverlayOrigin">
            <div class="octopus-date-picker-content">{{value | date: format}}</div>
            <octopus-icon size="24" [@ICON_ROTATE]="(state$ | async) ? 'up' : 'down'" class="ml-25">expand_circle_down</octopus-icon>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OctopusDatePicker),
            multi: true
        }
    ]
})
export class OctopusDatePicker extends AbstractOctopusInput {

    @Input('color') color: ColorPalette = 'primary';
    @Input('format') format: string = 'yyyy - MM - dd';
    @Input('value') value: any = new Date();

    @ViewChild('origin', { read: CdkOverlayOrigin, static: true })
    private origin!: CdkOverlayOrigin;

    @HostBinding('class') class: string = 'octopus-picker octopus-date-picker';

    @HostListener('click')
    private listenHostClick(): void {
        this.state$.next(true);
    }

    state$: Subject<boolean> = new Subject();

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

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-date-picker' : `octopus-${prevColor}-date-picker`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-date-picker`);
    }

    private create(): void {
        let positions: ConnectedPosition[] = [
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
            { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
            { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }
        ];
        let positionStrategy: FlexibleConnectedPositionStrategy = this._overlay.position().flexibleConnectedTo(this.origin.elementRef)
            .withPositions(positions);
        let scrollStrategy: any = this._overlay.scrollStrategies.close();
        this.ref = this._overlay.create({
            panelClass: ['octopus-date-picker-overlay', `octopus-${this.color}-date-picker-overlay`],
            positionStrategy, scrollStrategy,
            width: '20rem'
        });

        let temp: ConnectedOverlayPositionChange;
        let subscription: Subscription = positionStrategy.positionChanges.subscribe(value => {
            temp = value;

            if (value.connectionPair == temp.connectionPair) {
                this.updateSub.unsubscribe();
                subscription.unsubscribe();
            }
        });
    }

    private show(): void {
        this.create();
        this.ref.attach(new ComponentPortal(OctopusDatePickerDropdown, this._vcr, Injector.create({
            parent: this._injector,
            providers: [
                {
                    provide: OCTOPUS_DATE_PICKER_INJECTOR_DATA,
                    useValue: {
                        color: this.color,
                        value: this.value
                    }
                }
            ]
        })));
        this.updateSub = interval(250).subscribe(() => this.ref.updatePosition());
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

let colorID: number = 0;
let fileID: number = 0;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-color-picker',
    template: `
        <div class="octopus-color-picker-wrapper">
            <input type="color" [id]="'octopus-color-picker-' + (id$ | async)" [value]="value" (change)="updateChange(input.value)" class="d-none" #input>
            <label octopus-ripple class="octopus-picker-control"  [for]="'octopus-color-picker-' + (id$ | async)">
                <span class="octopus-picker-palette" #palette></span>
            </label>
            <octopus-range [color]="color" [(value)]="alpha" minValue="0" maxValue="100" step="1" #range></octopus-range>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OctopusColorPicker),
            multi: true
        }
    ]
})
export class OctopusColorPicker extends AbstractOctopusInput implements OnDestroy, AfterViewInit {

    @Input('alpha')
    get alpha(): number { return this._alpha; }
    set alpha(_alpha: number) { this._alpha = coerceNumberProperty(_alpha); }
    private _alpha: number = 100;

    @Input('value') value: any = '#ffffff';

    @Output('colorChange') change: EventEmitter<OctopusColorValue> = new EventEmitter();

    @ViewChild('palette', { read: ElementRef, static: true })
    private palette!: ElementRef<HTMLElement>;

    @ViewChild('range', { read: OctopusRange })
    private range!: OctopusRange;

    @HostBinding('class') class: string = 'octopus-color-picker';

    id$!: Observable<number>;

    private subscription!: Subscription;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => super.ngOnChanges(changes));

        if (changes.alpha !== undefined) {
            setTimeout(() => this.updateColor(this.value, coerceNumberProperty(changes.alpha.currentValue)));
        }

        if (changes.value !== undefined) {
            setTimeout(() => this.updateColor(changes.value.currentValue, coerceNumberProperty(this.alpha)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            super.ngOnInit();
            this.updateColor(this.value, this.alpha);
        })
    }

    ngAfterViewInit() {
        this.id$ = of(++colorID);
        this.subscription = this.range.valueChange.asObservable().subscribe(value => this.updateColor(this.value, value));
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }

        this.change.complete();
    }

    updateChange(value: any): void {
        super.updateChange(value);
        this.updateColor(value, this.alpha);
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-color-picker' : `octopus-${prevColor}-color-picker`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-color-picker`);
    }

    private updateColor(value: string, alpha: number): void {
        let rgb = this.colorHEXtoRGB(value);
        this.change.emit(new OctopusColorValue(value, rgb, alpha));
        this._render.setStyle(this.palette.nativeElement, 'background-color', `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha * 0.01})`);
    }

    private colorHEXtoRGB(value: string): { red: number, green: number, blue: number } {
        let red: number = Number.parseInt(value.charAt(1), 16) * 16 + Number.parseInt(value.charAt(2), 16);
        let green: number = Number.parseInt(value.charAt(3), 16) * 16 + Number.parseInt(value.charAt(4), 16);
        let blue = Number.parseInt(value.charAt(5), 16) * 16 + Number.parseInt(value.charAt(6), 16);
        return { red, green, blue };
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-file-picker',
    template: `
        <label class="octopus-file-picker-wrapper" [for]="'octopus-file-picker-' + (id$ | async)" octopus-ripple>
            <input type="file" [accept]="accept" [id]="'octopus-file-picker-' + (id$ | async)" (change)="listenFileSelectChange(input.files)" 
                class="d-none" #input>
            <span class="octopus-picker-control">Browser</span>
            <table class="octopus-picker-meta">
                <tr>
                    <td colspan="3" class="text-truncate" style="font-size: 1rem;font-weight: bold;">{{name}}</td>
                </tr>
                <tr>
                    <td width="33.33%" class="text-truncate">{{mime}}</td>
                    <td width="33.33%" class="text-truncate">{{size}}</td>
                    <td width="33.33%" class="text-truncate">{{date === undefined ? '' : date | date: 'full'}}</td>
                </tr>
            </table>
            <div class="octopus-picker-progress">
                <octopus-progress-pie radius="28" thick="6" [value]="value$ | async" [total]="total$ | async"></octopus-progress-pie>
            </div>
        </label>
    `
})
export class OctopusFilePicker extends AbstractOctopusComponent implements AfterViewInit {

    @Input('accept') accept: string[] | string = [];
    @Input('color') color: ColorPalette = 'primary';
    @Input('type') type: OctopusFileType = 'base64';

    @Output('blobChange') change: EventEmitter<OctopusBlobValue> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-file-picker';

    id$!: Observable<number>;
    value$: Observable<number> = of(0);
    total$: Observable<number> = of(100);

    name: string = '';
    mime: string = '';
    size: string = '';
    date: Date | undefined;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref);
    }

    ngAfterViewInit() {
        this.id$ = of(++fileID);
    }

    listenFileSelectChange(files: FileList | null): void {
        this.value$ = of(0);
        this.total$ = of(100);
        setTimeout(() => this.updateMetaData(files), 1250);
    }

    private updateMetaData(files: FileList | null): void {
        if (files !== null && files.length === 1) {
            let file: File = files.item(0) as File;
            this.name = file.name;
            this.size = `${file.size}(bytes)`;
            this.mime = file.type;
            this.date = new Date(file.lastModified);

            let reader: FileReader = new FileReader();
            reader.onloadstart = (event: ProgressEvent<FileReader>) => {
                this.value$ = of(event.loaded);
                this.total$ = of(event.total);
            };
            reader.onloadend = (event: ProgressEvent<FileReader>) => event.target?.abort();
            reader.onload = (event: ProgressEvent<FileReader>) =>
                this.change.emit(new OctopusBlobValue(file, event.target?.result));
            reader.onprogress = (event: ProgressEvent<FileReader>) => {
                this.value$ = of(event.loaded);
                this._cdr.detectChanges();
            }

            switch (this.type) {
                case 'base64': reader.readAsDataURL(file); break;
                case 'bindary': reader.readAsBinaryString(file); break;
                case 'buffer': reader.readAsArrayBuffer(file); break;
                case 'text': reader.readAsText(file); break;
            }
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-file-picker' : `octopus-${prevColor}-file-picker`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-file-picker`);
    }

}