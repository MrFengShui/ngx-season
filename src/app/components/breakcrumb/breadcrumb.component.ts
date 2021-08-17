import { Component, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild } from "@angular/core";

@Component({
    selector: 'octopus-breadcrumb',
    template: `
        <div class="octopus-breadcrumb-wrapper">
            <ng-content select="octopus-breadcrumb-label,[octopus-breadcrumb-split],octopus-breadcrumb-action"></ng-content>
        </div>
    `
})
export class OctopusBreadcrumb {

    @HostBinding('class') class: string = 'octopus-breadcrumb';

}

@Component({
    selector: 'octopus-breadcrumb-label',
    template: `
        <div class="octopus-breadcrumb-label-wrapper">
            <span class="icon">
                <span class="material-icons">{{icon}}</span>
            </span>
            <span class="text">{{text}}</span>
        </div>
    `
})
export class OctopusBreadcrumbLabel {

    @Input('icon') icon: string = '';
    @Input('text') text: string = '';

    @HostBinding('class') class: string = 'octopus-breadcrumb-label';

}

@Component({
    selector: 'octopus-breadcrumb-action',
    template: `
        <a class="octopus-breadcrumb-action-wrapper octopus-ripple" [routerLink]="link">
            <div class="octopus-ripple-wrapper" #ripple></div>
            <span class="icon">
                <span class="material-icons">{{icon}}</span>
            </span>
            <span class="text">{{text}}</span>
        </a>
    `
})
export class OctopusBreadcrumbAction extends OctopusBreadcrumbLabel {

    @Input('link') link: string | string[] = [];

    @ViewChild('ripple', { read: ElementRef, static: true })
    protected ripple: ElementRef<HTMLElement>;

    @HostListener('click', ['$event'])
    protected listenHostClick(event: MouseEvent): void {
        setTimeout(() => this._render.addClass(this.ripple.nativeElement, 'active'));
        setTimeout(() => this.locate(event));
        setTimeout(() => this._render.removeClass(this.ripple.nativeElement, 'active'), 500);
    }

    @HostBinding('class') class: string = 'octopus-breadcrumb-action';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    private locate(event: MouseEvent): void {
        let radius: number = this._ref.nativeElement.clientWidth;
        this._render.setStyle(this.ripple.nativeElement, 'width', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'height', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'top', `${event.pageY - this._ref.nativeElement.offsetTop - radius}px`);
        this._render.setStyle(this.ripple.nativeElement, 'left', `${event.pageX - this._ref.nativeElement.offsetLeft - radius}px`);
    }

}

@Component({
    selector: '[octopus-breadcrumb-split]',
    template: `<span class="material-icons"><ng-content></ng-content></span>`
})
export class OctopusBreadcrumbSplit {

    @HostBinding('class') class: string = 'octopus-breadcrumb-split';

}