import { animate, state, style, transition, trigger } from "@angular/animations";
import { CdkOverlayOrigin, ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, InjectionToken, Injector, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from "@angular/forms";
import { interval, Subject, Subscription } from "rxjs";
import { ColorPalette } from "src/app/global/enum.utils";

class OctopusSelectInjector {

    color: ColorPalette;
    template: TemplateRef<any>;

    constructor(
        private _color: ColorPalette,
        private _template: TemplateRef<any>
    ) {
        this.color = _color;
        this.template = _template;
    }

}

const OCTOPUS_SELECT_INJECTOR_DATA: InjectionToken<OctopusSelectInjector> = new InjectionToken('OctopusSelectInjectorData');

@Component({
    selector: 'octopus-select-option',
    template: `
        <div class="octopus-select-option-wrapper" #wrapper>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusSelectOption {

    @Input('value') value: any;

    @ViewChild('wrapper', { read: ElementRef, static: false })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-select-option';

    @HostListener('click')
    private listenHostClick(): void {
        this._select.changeState(false);
        this._select.changeSelect(this.value);
        this._select.changeDOM(this.copy(), this.value);
    }

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusSelect))
        private _select: OctopusSelect
    ) { }

    copy(): HTMLElement {
        if (this.wrapper.nativeElement.children.length > 0) {
            let element: HTMLElement = this.wrapper.nativeElement.children.item(0) as HTMLElement;
            return element.cloneNode(true) as HTMLElement;
        } else {
            let content: HTMLElement = this._render.createText(this.wrapper.nativeElement.textContent as string);
            let element: HTMLElement = this._render.createElement('div');
            this._render.setAttribute(element, 'class', 'w-100');
            this._render.appendChild(element, content);
            return element;
        }
    }

    render(flag: boolean): void {
        if (flag) {
            this._render.addClass(this._ref.nativeElement, 'active');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'active');
        }
    }

}

@Component({
    selector: 'octopus-select-dropdown',
    template: `<ng-template [cdkPortalOutlet]="portal"></ng-template>`
})
export class OctopusSelectDropdown implements OnInit {

    @HostBinding('class') class: string = 'octopus-select-dropdown-wrapper';

    portal!: TemplatePortal;

    constructor(
        @Inject(OCTOPUS_SELECT_INJECTOR_DATA)
        private _data: OctopusSelectInjector,
        private _vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        this.portal = new TemplatePortal(this._data.template, this._vcr);
    }

}

@Component({
    selector: 'octopus-select',
    template: `
        <div class="octopus-select-wrapper" cdkOverlayOrigin #origin="cdkOverlayOrigin">
            <span class="flex-fill d-flex justify-content-center" #content></span>
            <span class="material-icons" style="font-size: 0.85rem;" [@ICON_ROTATE]="(state$ | async) ? 'up' : 'down'">expand_circle_down</span>
        </div>
        <ng-template #template><ng-content select="octopus-select-option"></ng-content></ng-template>
    `,
    animations: [
        trigger('ICON_ROTATE', [
            state('up', style({ transform: 'rotate(180deg)' })),
            state('down', style({ transform: 'rotate(0deg)' })),
            transition('up => down', animate('250ms ease-in-out')),
            transition('down => up', animate('250ms ease-in-out'))
        ])
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusSelect),
        multi: true
    }]
})
export class OctopusSelect extends SelectControlValueAccessor implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('placeholder') placeholder: string = '---------- Select One ----------';
    @Input('select') select: any;

    @Output('selectChange') selectChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('origin', { read: CdkOverlayOrigin, static: true })
    private origin!: CdkOverlayOrigin;

    @ViewChild('template', { read: TemplateRef, static: true })
    private template!: TemplateRef<any>;

    @ViewChild('content', { read: ElementRef, static: true })
    private content!: ElementRef<HTMLElement>;

    @ContentChildren(OctopusSelectOption)
    private options!: QueryList<OctopusSelectOption>;

    @HostBinding('class') class: string = 'octopus-select';

    @HostListener('click')
    private listenHostClick(): void {
        this.changeState(true);
    }

    state$: Subject<boolean> = new Subject();

    private state: boolean = false;
    private ref!: OverlayRef;
    private stateSub!: Subscription;
    private selectSub!: Subscription;
    private updateSub!: Subscription;
    private eventSub!: Subscription;

    constructor(
        private _ref: ElementRef,
        private _injector: Injector,
        private _overlay: Overlay,
        private _render: Renderer2,
        private _vcr: ViewContainerRef
    ) {
        super(_render, _ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.select !== undefined) {
            this.changeSelect(changes.select.currentValue);
        }
    }

    ngOnInit() {
        this.changeSelect(this.select);
    }

    ngAfterViewInit() {
        if (this.select !== undefined) {
            this.update(this.select)
        }

        this.selectSub = this.selectChange.asObservable().subscribe(value => this.update(value));
        this.stateSub = this.state$.asObservable().subscribe(value => {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        });
    }

    ngOnDestroy() {
        if (this.stateSub !== undefined && !this.stateSub.closed) {
            this.stateSub.unsubscribe();
        }

        if (this.selectSub !== undefined && !this.selectSub.closed) {
            this.selectSub.unsubscribe();
        }

        if (this.eventSub !== undefined && !this.eventSub.closed) {
            this.eventSub.unsubscribe();
        }

        if (this.updateSub !== undefined && !this.updateSub.closed) {
            this.updateSub.unsubscribe();
        }
    }

    writeValue(value: any): void {
        if (value !== null) {
            this.changeSelect(value);
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {

    }

    onChange!: (_: any) => void;
    onTouched!: () => void;

    changeState(state: boolean): void {
        this.state = state;
        this.state$.next(this.state);
    }

    changeSelect(select: any): void {
        this.select = select;
        this.selectChange.emit(this.select);
    }

    changeDOM(element: HTMLElement | undefined, value: any): void {
        if (value === undefined) {
            element = this._render.createElement('span');
            element?.appendChild(this._render.createText(this.placeholder));
        }

        let children: HTMLCollection = this.content.nativeElement.children;

        if (children.length === 1) {
            this._render.removeChild(this.content.nativeElement, children.item(0));
        }

        this._render.appendChild(this.content.nativeElement, element);
    }

    private update(value: any): void {
        this.options.forEach(option => option.render(false));
        let option: OctopusSelectOption = this.options.find(option => option.value === value) as OctopusSelectOption;
        option.render(true);
        let element: HTMLElement = option.copy() as HTMLElement;
        this.changeDOM(element, value);
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
            panelClass: ['octopus-select-overlay', `octopus-${this.color}-select-overlay`, 'octopus-shadow-z1'],
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
                        template: this.template
                    }
                }
            ]
        })));
        this.updateSub = interval(250).subscribe(() => this.ref.updatePosition());
        this.eventSub = this.ref.outsidePointerEvents().subscribe(event => this.changeState(false));
    }

    private hide(): void {
        if (this.ref.hasAttached()) {
            this.ref.detach();
            this.ref.dispose();
            this.eventSub.unsubscribe();
        }
    }

}

function take(arg0: number): import("rxjs").OperatorFunction<number, unknown> {
    throw new Error("Function not implemented.");
}
