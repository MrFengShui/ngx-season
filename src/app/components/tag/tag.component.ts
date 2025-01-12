import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Inject, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonImageAvatarDirective } from "../image/image.directive";
import { NGX_SEASON_TAG_GRID_TOKEN, NGXSeasonTagGridComponent } from "./tag-grid.component";

export type NGXSeasonTagShape = 'circle' | 'square';
export type NGXSeasonTagSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'ngx-sui-tag, a[ngx-sui-Tag]',
    template: `
        <span class="label" #ref>{{ label }}</span>
        <button ngx-sui-IconButton [btnColor]="color" [btnCircled]="shape === 'circle'" btnIcon="close" btnStyle="solid" class="close" (click)="handleTagDeleteEvent($event)" *ngIf="deletable"></button>
        <ng-template><ng-content select="img[ngx-sui-Avatar]"></ng-content></ng-template>
    `
})
export class NGXSeasonTagComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input({ alias: 'tagColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || undefined;
    }

    get color(): NGXSeasonColorPalette | undefined {
        return this._color;
    }

    @Input({ alias: 'tagDeletable' })
    set deletable(deletable: boolean | string | undefined | null) {
        this._deletable = coerceBooleanProperty(deletable);
    }

    get deletable(): boolean {
        return this._deletable;
    }

    @Input({ alias: 'tagLabel', required: true })
    set label(label: string | undefined | null) {
        this._label = label || undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input({ alias: 'tagShape' })
    set shape(shape: NGXSeasonTagShape | undefined | null) {
        this._shape = shape || 'circle';
    }

    get shape(): NGXSeasonTagShape {
        return this._shape;
    }

    @Input({ alias: 'tagSize' })
    set size(size: NGXSeasonTagSize | undefined | null) {
        this._size = size || 'md';
    }

    get size(): NGXSeasonTagSize {
        return this._size;
    }

    private _color: NGXSeasonColorPalette | undefined;
    private _deletable: boolean = false;
    private _label: string | undefined;
    private _shape: NGXSeasonTagShape = 'circle';
    private _size: NGXSeasonTagSize = 'md';

    @Output('tagDeleteEvent')
    deleteEvent: EventEmitter<void> = new EventEmitter(true);

    @ContentChild(NGXSeasonImageAvatarDirective, { read: ElementRef })
    protected avatar: ElementRef<HTMLElement> | undefined;

    @ViewChild('ref', { read: ElementRef, static: true })
    protected ref: ElementRef<HTMLElement> | undefined;

    @HostListener('click', ['$event'])
    protected handleHostClickEvent(event: MouseEvent): void {
        event.preventDefault();
        this._tagGrid.tagSelectedChange.emit({ value: this.label, source: this });
    }

    readonly id: string = `ngx-sui-tag-${this._tagGrid.tagIndex++}`;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        protected _usd: UniqueSelectionDispatcher,

        @Inject(NGX_SEASON_TAG_GRID_TOKEN)
        protected _tagGrid: NGXSeasonTagGridComponent
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeTagColor(changes[name].currentValue as NGXSeasonColorPalette || this._tagGrid.color);

            if (name === 'shape') this.changeTagShape(changes[name].currentValue as NGXSeasonTagShape);

            if (name === 'size') this.changeTagSize(changes[name].currentValue as NGXSeasonTagSize);
        }
    }

    ngAfterContentInit(): void {
        if (this.avatar && this.ref) this._renderer.insertBefore(this._element.nativeElement, this.avatar.nativeElement, this.ref.nativeElement);
    }

    ngAfterViewInit(): void {
        const element = this._element.nativeElement;
        this._renderer.addClass(element, 'tag');

        if (element instanceof HTMLAnchorElement) this._renderer.addClass(element, 'link-tag');

        this.changeTagColor(this.color || this._tagGrid.color);
        this.changeTagShape(this.shape);
        this.changeTagSize(this.size);
    }

    fetchHostElement(): HTMLElement {
        return this._element.nativeElement;
    }

    protected changeTagColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tag-color', color);
    }

    protected changeTagShape(shape: NGXSeasonTagShape): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tag-shape', shape);
    }

    protected changeTagSize(size: NGXSeasonTagSize): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tag-size', size);
    }

    protected handleTagDeleteEvent(event: MouseEvent): void {
        event.stopPropagation();
        this._usd.notify(this.id, this._tagGrid.id);
    }

}

