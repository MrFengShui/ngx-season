import { AfterViewInit, Component, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

export type NGXSeasonPlaceholderShape = 'block' | 'circle' | 'column';

@Directive({
    selector: 'div[ngx-sui-PlaceholderShape]'
})
export class NGXSeasonPlaceholderShapeDirective implements OnChanges, AfterViewInit {

    @Input('phShape')
    set shape(shape: NGXSeasonPlaceholderShape) {
        this._shape = shape;
    }

    get shape(): NGXSeasonPlaceholderShape {
        return this._shape;
    }

    private _shape: NGXSeasonPlaceholderShape = 'block';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'shape') this.changePlaceholderShape(changes[name].currentValue as NGXSeasonPlaceholderShape);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'placeholder-shape');
        this.changePlaceholderShape(this.shape);
    }

    protected changePlaceholderShape(shape: NGXSeasonPlaceholderShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-placeholder-shape', shape);
    }

}

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonPlaceholderComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'placeholder');
    }

}

@Component({
    selector: 'div[ngx-sui-CardPlaceholder]',
    template: `
        <div class="placeholder-header">
            <div ngx-sui-PlaceholderShape phShape="circle"></div>
            <div class="placeholder-header-wrapper">
                <div ngx-sui-PlaceholderShape phShape="column"></div>
                <div ngx-sui-PlaceholderShape phShape="column"></div>
            </div>
        </div>
        <div ngx-sui-PlaceholderShape phShape="block"></div>
        <div class="placeholder-content">
            <div ngx-sui-PlaceholderShape phShape="column"></div>
            <div ngx-sui-PlaceholderShape phShape="column"></div>
            <div ngx-sui-PlaceholderShape phShape="column"></div>
            <div ngx-sui-PlaceholderShape phShape="column"></div>
        </div>
        
    `
})
export class NGXSeasonCardPlaceholderComponent extends NGXSeasonPlaceholderComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        
        this._renderer.addClass(this._element.nativeElement, 'card-placeholder');
    }

}