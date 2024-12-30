import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, NgZone, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, debounceTime, Subject, Subscription } from "rxjs";

import { NGXSeasonButtonStyle, NGXSeasonTextButtonComponent } from "./button.component";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonSizeOption } from "src/app/utils/size.utils";

type NGXSeasonButtonGroupMetainfo = { color: NGXSeasonColorPalette, disabled: boolean, size: NGXSeasonSizeOption, style: NGXSeasonButtonStyle };

@Component({
    selector: 'ngx-sui-button-group',
    template: `<ng-content select="button[ngx-sui-TextButton]"></ng-content>`
})
export class NGXSeasonButtonGroupComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('bgColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('bgDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('bgSize')
    set size(size: NGXSeasonSizeOption | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonSizeOption {
        return this._size;
    }

    @Input('bgStyle')
    set style(style: NGXSeasonButtonStyle | undefined | null) {
        this._style = style || 'outline';
    }

    get style(): NGXSeasonButtonStyle {
        return this._style;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _size: NGXSeasonSizeOption = 'md';
    private _style: NGXSeasonButtonStyle = 'outline';

    @ContentChildren(NGXSeasonTextButtonComponent)
    protected buttons: QueryList<NGXSeasonTextButtonComponent> | undefined;

    private metainfo: NGXSeasonButtonGroupMetainfo = { color: this.color, disabled: this.disabled, size: this.size, style: this.style };

    private metainfoChange$: Subject<NGXSeasonButtonGroupMetainfo> = new BehaviorSubject(this.metainfo);
    private metainfo$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.metainfo.color = changes[name].currentValue as NGXSeasonColorPalette;

            if (name === 'disabled') this.metainfo.disabled = coerceBooleanProperty(changes[name].currentValue);

            if (name === 'size') this.metainfo.size = changes[name].currentValue as NGXSeasonSizeOption;

            if (name === 'style') this.metainfo.style = changes[name].currentValue as NGXSeasonButtonStyle;
        }

        this.metainfoChange$.next(this.metainfo);
    }

    ngOnDestroy(): void {
        this.metainfo$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'button-group');

        this.listenMetainfoChange();
    }

    private listenMetainfoChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.metainfo$ = this.metainfoChange$.asObservable().pipe(debounceTime(100))
                .subscribe(metainfo =>
                    this._ngZone.run(() =>
                        this.buttons?.forEach(button =>
                            button.changeButtonAttributes(metainfo.color, metainfo.disabled, metainfo.size, metainfo.style)))));
    }

}
