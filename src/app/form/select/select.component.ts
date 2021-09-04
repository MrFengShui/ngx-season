import { animate, state, style, transition, trigger } from "@angular/animations";
import { CdkOverlayOrigin, ConnectedPosition, ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, DomPortal, TemplatePortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, HostBinding, HostListener, Inject, InjectionToken, Injector, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject, Subscription } from "rxjs";

class OctopusSelectInjector {

    template: TemplateRef<any>;

    constructor(
        private _template: TemplateRef<any>
    ) {
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

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-select-option';

    @HostListener('click')
    private listenHostClick(): void {
        this._select.changeState(false);
        this._select.changeDOM(this.wrapper.nativeElement);
    }

    constructor(
        @Inject(forwardRef(() => OctopusSelect))
        private _select: OctopusSelect
    ) { }

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
            <span class="flex-fill"><ng-template [cdkPortalOutlet]="portal"></ng-template></span>
            <span class="material-icons" style="font-size: 0.75rem;" [@ICON_ROTATE]="(state$ | async) ? 'up' : 'down'">arrow_drop_down_circle</span>
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
    ]
})
export class OctopusSelect implements OnDestroy, AfterViewInit {

    @ViewChild('origin', { read: CdkOverlayOrigin, static: true })
    private origin!: CdkOverlayOrigin;

    @ViewChild('template', { read: TemplateRef, static: true })
    private template!: TemplateRef<any>;

    @ContentChildren(OctopusSelectOption)
    private options!: QueryList<OctopusSelectOption>;

    @HostBinding('class') class: string = 'octopus-select';

    @HostListener('click')
    private listenHostClick(): void {
        this.changeState(!this.state);
    }

    portal!: DomPortal;
    state$: Subject<boolean> = new Subject();

    private state: boolean = false;
    private ref!: OverlayRef;
    private subscription!: Subscription;

    constructor(
        private _injector: Injector,
        private _overlay: Overlay,
        private _vcr: ViewContainerRef
    ) { }

    ngAfterViewInit() {
        this.subscription = this.state$.asObservable().subscribe(value => {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    changeState(state: boolean): void {
        this.state = state;
        this.state$.next(this.state);
    }

    changeDOM(element: HTMLElement): void {
        this.portal = new DomPortal(element);
    }

    private create(): void {
        let positions: ConnectedPosition[] = [
            new ConnectionPositionPair(
                { originX: 'center', originY: 'bottom' },
                { overlayX: 'center', overlayY: 'top' }
            )
        ];
        let positionStrategy: FlexibleConnectedPositionStrategy = this._overlay.position().flexibleConnectedTo(this.origin.elementRef)
            .withPositions(positions);
        this.ref = this._overlay.create({
            panelClass: ['octopus-select-overlay', 'octopus-shadow-z1'],
            positionStrategy,
            width: this.origin.elementRef.nativeElement.clientWidth
        });
    }

    private show(): void {
        this.create();
        this.ref.attach(new ComponentPortal(OctopusSelectDropdown, this._vcr, Injector.create({
            parent: this._injector,
            providers: [
                { provide: OCTOPUS_SELECT_INJECTOR_DATA, useValue: { template: this.template } }
            ]
        })));
        this.ref.updatePosition();
    }

    private hide(): void {
        if (this.ref.hasAttached()) {
            this.ref.detach();
            this.ref.dispose();
        }
    }

}