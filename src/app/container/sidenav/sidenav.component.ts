import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

import { SidenavMode, SidenavPosition, SidenavState } from "./sidenav.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-sidenav-control',
    template: `
        <div class="octopus-sidenav-control-wrapper overflow" [class.active]="active">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusSidenavControl implements OnChanges, OnInit {

    @Input('active') active: boolean | string = false;
    @Input('mode') mode: SidenavMode = 'side';
    @Input('position') position: SidenavPosition = 'start';
    @Input('size') size: number | string = 240;

    @Output('activeChange') activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output('stateChange') stateChange: EventEmitter<SidenavState> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-sidenav-control';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.active !== undefined) {
            setTimeout(() => {
                this.renderState(coerceBooleanProperty(changes.active.currentValue), coerceNumberProperty(this.size));
                this.emitState(coerceBooleanProperty(changes.active.currentValue));
            });
        }

        if (changes.position !== undefined) {
            setTimeout(() => this.renderPosition(changes.position.previousValue, changes.position.currentValue));
        }

        if (changes.size !== undefined) {
            setTimeout(() => {
                this.renderState(coerceBooleanProperty(this.active), coerceNumberProperty(changes.size.currentValue));
                this.emitState(coerceBooleanProperty(this.active));
            });
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderPosition(undefined, this.position);
            this.renderState(coerceBooleanProperty(this.active), coerceNumberProperty(this.size));
            this.emitState(coerceBooleanProperty(this.active))
        });
    }

    getElementRef(): ElementRef {
        return this._ref;
    }

    private renderPosition(prevPos: SidenavPosition | undefined, currPos: SidenavPosition): void {
        this._render.removeClass(this._ref.nativeElement, prevPos === undefined ? 'start' : prevPos);
        this._render.addClass(this._ref.nativeElement, currPos);
    }

    private renderState(active: boolean, size: number): void {
        if (active) {
            this._render.setStyle(this._ref.nativeElement, 'width', `${size}px`);
        } else {
            this._render.setStyle(this._ref.nativeElement, 'width', 0);
        }
    }

    private emitState(active: boolean): void {
        this.stateChange.emit(active ? 'show' : 'hide');
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-sidenav-content',
    template: `
        <div class="octopus-sidenav-content-wrapper overflow" [style.overflow]="!(active$ | async) ? 'auto' : 'hidden'">
            <div class="octopus-sidenav-mask" [class.active]="active$ | async"></div>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusSidenavContent implements AfterViewInit {

    @HostBinding('class') class: string = 'octopus-sidenav-content';

    active$: Subject<boolean> = new Subject();

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusSidenav))
        private _sidenav: OctopusSidenav
    ) { }

    ngAfterViewInit() {
        this._sidenav.controls.forEach(control =>
            control.stateChange.asObservable().subscribe(value =>
                this.renderMargin(control.mode, value, control.position, coerceNumberProperty(control.size))));
    }

    private renderMargin(mode: SidenavMode, state: SidenavState, position: SidenavPosition, size: number): void {
        if (mode === 'side') {
            if (state === 'show') {
                if (position === 'start') {
                    this._render.setStyle(this._ref.nativeElement, 'margin-left', `${size}px`);
                }

                if (position === 'end') {
                    this._render.setStyle(this._ref.nativeElement, 'margin-right', `${size}px`);
                }
            }

            if (state === 'hide') {
                if (position === 'start') {
                    this._render.removeStyle(this._ref.nativeElement, 'margin-left');
                }

                if (position === 'end') {
                    this._render.removeStyle(this._ref.nativeElement, 'margin-right');
                }
            }
        }

        if (mode === 'push') {
            let width: number = this._sidenav.getElementRef().nativeElement.children[0].clientWidth;
            this._render.setStyle(this._ref.nativeElement, 'min-width', `${width}px`);
            this._render.setStyle(this._ref.nativeElement, 'max-width', `${width}px`);

            if (state === 'show') {
                this.active$.next(true);

                if (position === 'start') {
                    this._render.setStyle(this._ref.nativeElement, 'transform', `translateX(${size}px)`);

                    if (this._sidenav.controls.length === 2) {
                        this._render.setStyle(this._sidenav.controls.get(1)?.getElementRef().nativeElement, 'transform', `translateX(${size}px)`);
                        this._render.setStyle(this._sidenav.controls.get(1)?.getElementRef().nativeElement, 'visibility', 'hidden');
                        this._render.setStyle(this._sidenav.controls.get(1)?.getElementRef().nativeElement, 'max-width', 0);
                    }
                }

                if (position === 'end') {
                    this._render.setStyle(this._ref.nativeElement, 'transform', `translateX(-${size}px)`);

                    if (this._sidenav.controls.length === 2) {
                        this._render.setStyle(this._sidenav.controls.get(0)?.getElementRef().nativeElement, 'transform', `translateX(-${size}px)`);
                        this._render.setStyle(this._sidenav.controls.get(1)?.getElementRef().nativeElement, 'visibility', 'hidden');
                        this._render.setStyle(this._sidenav.controls.get(1)?.getElementRef().nativeElement, 'max-width', 0);
                    }
                }
            }

            if (state === 'hide') {
                this.active$.next(false);
                this._render.removeStyle(this._ref.nativeElement, 'transform');

                if (this._sidenav.controls.length === 2) {
                    this._sidenav.controls.forEach(control => {
                        this._render.removeStyle(control.getElementRef().nativeElement, 'transform');
                        this._render.removeStyle(control.getElementRef().nativeElement, 'visibility');
                        this._render.removeStyle(control.getElementRef().nativeElement, 'max-width');
                    });
                }
            }
        }

        if (mode === 'over') {
            if (state === 'show') {
                this.active$.next(true);
            }

            if (state === 'hide') {
                this.active$.next(false);
            }

            if (position === 'start') {
                this._render.removeStyle(this._ref.nativeElement, 'margin-left');
            }

            if (position === 'end') {
                this._render.removeStyle(this._ref.nativeElement, 'margin-right');
            }
        }
    }

}

@Component({
    selector: 'octopus-sidenav',
    templateUrl: './sidenav.component.html'
})
export class OctopusSidenav implements AfterContentInit {

    @Output('maskClick') maskClick: EventEmitter<void> = new EventEmitter();

    @ContentChildren(OctopusSidenavControl)
    controls!: QueryList<OctopusSidenavControl>;

    @ContentChildren(OctopusSidenavContent)
    contents!: QueryList<OctopusSidenavContent>;

    @ViewChild('controlTemplate', { read: TemplateRef, static: true })
    private controlTemplate!: TemplateRef<any>;

    @ViewChild('contentTemplate', { read: TemplateRef, static: true })
    private contentTemplate!: TemplateRef<any>;

    @HostBinding('class') class: string = 'octopus-sidenav';

    controlPortal!: TemplatePortal;
    contentPortal!: TemplatePortal;

    constructor(
        private _ref: ElementRef,
        private _vcr: ViewContainerRef,
    ) { }

    ngAfterContentInit() {
        try {
            this.handleControlError();
        } catch (error) {
            console.error(error);
        }

        try {
            this.handleContentError();
        } catch (error) {
            console.error(error);
        }
    }

    getElementRef(): ElementRef {
        return this._ref;
    }

    private handleControlError(): void {
        if (this.controls.length > 2) {
            throw new Error('Error: not more than two OctopusSidenavControls are allowed to put into OctopusSidenav.');
        }

        if (this.controls.length === 2 && this.controls.get(0)?.position === this.controls.get(1)?.position) {
            throw new Error('Error: the same position of two OctopusSidenavControls are not allowed to set.');
        }

        this.controlPortal = new TemplatePortal(this.controlTemplate, this._vcr);
    }

    private handleContentError(): void {
        if (this.contents.length > 1) {
            throw new Error('Error: not one more OctopusSidenavContents are allowed to put into OctopusSidenav.');
        }

        this.contentPortal = new TemplatePortal(this.contentTemplate, this._vcr);
    }

}

