import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, Input, HostListener, SimpleChanges } from '@angular/core';

import { NGXSeasonIconName } from '../icon/icon.component';
import { NGXSeasonButtonComponent } from './button.component';

@Component({
    selector: 'button[ngx-sui-FlatIconButton], a[ngx-sui-FlatIconButton]',
    templateUrl: './icon-btn.component.html'
})
export class NGXSeasonFlatIconButtonComponent extends NGXSeasonButtonComponent {

    @Input('btnCircled')
    set circled(circled: boolean | string) {
        this._circled = coerceBooleanProperty(circled);
    }

    get circled(): boolean {
        return this._circled;
    }

    @Input('btnIconDegree')
    set degree(degree: number | string) {
        this._degree = coerceNumberProperty(degree);
    }

    get degree(): number {
        return this._degree;
    }

    @Input('btnIconDegreeStart')
    set degreeStart(degreeStart: number | string) {
        this._degreeStart = coerceNumberProperty(degreeStart);
    }

    get degreeStart(): number {
        return this._degreeStart;
    }

    @Input('btnIconDegreeFinal')
    set degreeFinal(degreeFinal: number | string) {
        this._degreeFinal = coerceNumberProperty(degreeFinal);
    }

    get degreeFinal(): number {
        return this._degreeFinal;
    }

    @Input('btnIcon')
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('btnIconRotateDuration')
    set rotateDuration(rotateDuration: number | string) {
        this._rotateDuration = coerceNumberProperty(rotateDuration);
    }

    get rotateDuration(): number {
        return this._rotateDuration;
    }

    @Input('btnIconRotateInfinite')
    set rotateInfinite(rotateInfinite: boolean | string) {
        this._rotateInfinite = coerceBooleanProperty(rotateInfinite);
    }

    get rotateInfinite(): boolean {
        return this._rotateInfinite;
    }

    private _circled: boolean = false;
    private _degree: number = 0;
    private _degreeStart: number = 0;
    private _degreeFinal: number = 0;
    private _icon: NGXSeasonIconName | undefined;
    private _rotateDuration: number = 0;
    private _rotateInfinite: boolean = false;

    @HostListener('mouseenter', ['$event'])
    protected handleHostMouseEnterEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.isLinkHover = true;
    }

    @HostListener('mouseleave', ['$event'])
    protected handleHostMouseLeaveEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.isLinkHover = false;
    }

    protected isLinkHover: boolean = false;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'circled') this.setupButtonCircled(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'flat-icon-button');

        this.setupButtonCircled(this.circled);
    }

    protected override setupButtonBlocked(blocked: boolean): void {
        
    }

    protected setupButtonCircled(circled: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (circled) {
            this._renderer.addClass(element, 'button-circle');
        } else {
            this._renderer.removeClass(element, 'button-circle');
        }
    }

}

@Component({
    selector: 'button[ngx-sui-OutlineIconButton], a[ngx-sui-OutlineIconButton]',
    templateUrl: './icon-btn.component.html'
})
export class NGXSeasonOutlineIconButtonComponent extends NGXSeasonFlatIconButtonComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.removeClass(element, 'flat-icon-button');
        this._renderer.addClass(element, 'outline-icon-button');
    }

}

@Component({
    selector: 'button[ngx-sui-SolidIconButton], a[ngx-sui-SolidIconButton]',
    templateUrl: './icon-btn.component.html'
})
export class NGXSeasonSolidIconButtonComponent extends NGXSeasonFlatIconButtonComponent {

    @Input('btnShadow')
    set shadow(shadow: boolean | string) {
        this._shadow = coerceBooleanProperty(shadow);
    }

    get shadow(): boolean {
        return this._shadow;
    }

    private _shadow: boolean = false;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'shadow') this.setupButtonShadow(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.removeClass(element, 'flat-icon-button');
        this._renderer.addClass(element, 'solid-icon-button');

        this.setupButtonShadow(this.shadow);
    }

    protected setupButtonShadow(shadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        if (shadow) {
            this._renderer.addClass(element, `button-shadow`);
        } else {
            this._renderer.removeClass(element, `button-shadow`);
        }
    }

}

