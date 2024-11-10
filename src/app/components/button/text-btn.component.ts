import { Component } from '@angular/core';

import { NGXSeasonFlatIconButtonComponent, NGXSeasonOutlineIconButtonComponent, NGXSeasonSolidIconButtonComponent } from './icon-btn.component';

@Component({
    selector: 'button[ngx-sui-FlatTextButton], a[ngx-sui-FlatTextButton]',
    templateUrl: './text-btn.component.html'
})
export class NGXSeasonFlatTextButtonComponent extends NGXSeasonFlatIconButtonComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.removeClass(this._element.nativeElement, 'flat-icon-button');
        this._renderer.addClass(this._element.nativeElement, 'flat-text-button');
    }

    protected override setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (blocked) {
            this._renderer.addClass(element, 'button-block');
        } else {
            this._renderer.removeClass(element, 'button-block');
        }
    }

}
@Component({
    selector: 'button[ngx-sui-OutlineTextButton], a[ngx-sui-OutlineTextButton]',
    templateUrl: './text-btn.component.html'
})
export class NGXSeasonOutlineTextButtonComponent extends NGXSeasonOutlineIconButtonComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        
        this._renderer.removeClass(this._element.nativeElement, 'outline-icon-button');
        this._renderer.addClass(this._element.nativeElement, 'outline-text-button');
    }

    protected override setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (blocked) {
            this._renderer.addClass(element, 'button-block');
        } else {
            this._renderer.removeClass(element, 'button-block');
        }
    }

}

@Component({
    selector: 'button[ngx-sui-SolidTextButton], a[ngx-sui-SolidTextButton]',
    templateUrl: './text-btn.component.html'
})
export class NGXSeasonSolidTextButtonComponent extends NGXSeasonSolidIconButtonComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        
        this._renderer.removeClass(this._element.nativeElement, 'solid-icon-button');
        this._renderer.addClass(this._element.nativeElement, 'solid-text-button');
    }

    protected override setupButtonBlocked(blocked: boolean): void {
        let element: HTMLElement = this._element.nativeElement;

        if (blocked) {
            this._renderer.addClass(element, 'button-block');
        } else {
            this._renderer.removeClass(element, 'button-block');
        }
    }

}

