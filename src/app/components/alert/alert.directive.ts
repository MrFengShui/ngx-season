import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive()
export abstract class NGXSeasonBaseAlertDirective {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

}

@Directive({
    selector: 'div[ngx-sui-AlertMessage]'
})
export class NGXSeasonAlertMessageDirective extends NGXSeasonBaseAlertDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert-message');
    }

}

@Directive({
    selector: 'div[ngx-sui-AlertSubject]'
})
export class NGXSeasonAlertSubjectDirective extends NGXSeasonBaseAlertDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert-subject');
    }

}

@Directive({
    selector: 'div[ngx-sui-AlertDescription]'
})
export class NGXSeasonAlertDiscriptionDirective extends NGXSeasonBaseAlertDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert-description');
    }

}
