import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, Directive, ElementRef, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

import { NGXSeasonModalRef } from "./modal.service";

export type NGXSeasonModalFooterAlign = 'start' | 'end' | 'center' | 'space-between' | 'space-around';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonModalContainerComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    fetchChildNodes(): HTMLCollection {
        return this._element.nativeElement.children;
    }

    setupModalContainerClass(classes: string = 'modal-container'): void {
        this._renderer.addClass(this._element.nativeElement, classes);
    }

}

@Component({
    selector: 'div[ngx-sui-ModalHeader]',
    template:  `
        <div class="header-wrapper"><ng-content></ng-content></div>
        <button ngx-sui-IconButton btnColor="success" btnCircled="true" btnStyle="solid" [btnIcon]="(_modalRef.resized() | async) ? 'window-restore' : 'window-max'" btnSize="md" (click)="_modalRef.resize()" *ngIf="!_modalRef.isFullScreen() && showResizeBtn"></button>
        <button ngx-sui-SolidIconButton btnColor="failure" btnCircled="true" btnIcon="window-close" btnSize="md" (click)="_modalRef.dismiss()" *ngIf="showCloseBtn"></button>
    `
})
export class NGXSeasonModalHeaderComponent implements AfterViewInit {

    @Input('headShowCloseBtn')
    set showCloseBtn(showCloseBtn: boolean | string | undefined | null) {
        this._showCloseBtn = coerceBooleanProperty(showCloseBtn);
    }

    get showCloseBtn(): boolean {
        return this._showCloseBtn;
    }

    @Input('headShowResizeBtn')
    set showResizeBtn(showResizeBtn: boolean | string | undefined | null) {
        this._showResizeBtn = coerceBooleanProperty(showResizeBtn);
    }

    get showResizeBtn(): boolean {
        return this._showResizeBtn;
    }

    private _showCloseBtn: boolean = true;
    private _showResizeBtn: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        protected _modalRef: NGXSeasonModalRef
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'modal-header');
    }

}

@Component({
    selector: 'div[ngx-sui-ModalFooter]',
    template:  `<ng-content></ng-content>`
})
export class NGXSeasonModalFooterComponent implements OnChanges, AfterViewInit {

    @Input('footAlign')
    set align(align: NGXSeasonModalFooterAlign | undefined | null) {
        this._align = align || 'end';
    }

    get align(): NGXSeasonModalFooterAlign {
        return this._align;
    }

    private _align: NGXSeasonModalFooterAlign = 'end';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'align') this.changeFooterAlign(changes[name].currentValue as NGXSeasonModalFooterAlign);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'modal-footer');

        this.changeFooterAlign(this.align);
    }

    protected changeFooterAlign(align: NGXSeasonModalFooterAlign): void {
        this._renderer.setStyle(this._element.nativeElement, '--modal-footer-align', align, RendererStyleFlags2.DashCase);
    }

}

@Component({
    selector: 'div[ngx-sui-ModalContent]',
    template:  `<ng-content></ng-content>`
})
export class NGXSeasonModalContentComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'modal-content');
    }

}
