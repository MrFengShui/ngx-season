import { coerceCssPixelValue, coerceNumberProperty } from "@angular/cdk/coercion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, InjectionToken, Input, OnChanges, OnDestroy, Output, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

import { NGXSeasonTagComponent } from "./tag.component";

export const NGX_SEASON_TAG_GRID_TOKEN: InjectionToken<NGXSeasonTagGridComponent> = new InjectionToken('NGX_SEASON_TAG_GRID_TOKEN');

export type NGXSeasonTagSelectedChange = { value: string | undefined, source: NGXSeasonTagComponent };

let tagGridIndex: number = 0;

@Component({
    selector: 'ngx-sui-tag-grid',
    template: `
        <span class="empty" *ngIf="tags?.length === 0">{{ empty }}</span>
        <ng-content select="ngx-sui-tag, a[ngx-sui-Tag]"></ng-content>
    `,
    providers: [{ provide: NGX_SEASON_TAG_GRID_TOKEN, useExisting: NGXSeasonTagGridComponent }]
})
export class NGXSeasonTagGridComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'tgColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'tgEmptyText', required: true })
    set empty(empty: string | undefined | null) {
        this._empty = empty || undefined;
    }

    get empty(): string | undefined {
        return this._empty;
    }

    @Input({ alias: 'tgGap' })
    set gap(gap: number | string | undefined | null) {
        this._gap = coerceNumberProperty(gap);
    }

    get gap(): number {
        return this._gap;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _empty: string | undefined;
    private _gap: number = 8;

    @Output('tgTagSelectedChange')
    tagSelectedChange: EventEmitter<NGXSeasonTagSelectedChange> = new EventEmitter(true);

    @ContentChildren(NGXSeasonTagComponent)
    protected tags: QueryList<NGXSeasonTagComponent> | undefined;

    readonly id: string = `ngx-sui-tag-grid-id-${tagGridIndex++}`;

    tagIndex: number = 0;

    private destroy = (): void => {};

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        protected _usd: UniqueSelectionDispatcher
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeTagGridColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'gap') this.setupTagGridGap(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tag-grid');

        this.changeTagGridColor(this.color);
        this.setupTagGridGap(this.gap);
        this.listenSelectionDispatcherChange();
    }

    protected changeTagGridColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tag-grid-color', color);
    }

    protected setupTagGridGap(gap: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'gap', coerceCssPixelValue(gap));
    }

    private listenSelectionDispatcherChange(): void {
        this.destroy = this._usd.listen((id, name) => {
            if (name === this.id && this.tags) {
                const tag = this.tags.find(tag => tag.id === id);

                if (tag) tag.deleteEvent.emit();
            }
        });
    }

}
