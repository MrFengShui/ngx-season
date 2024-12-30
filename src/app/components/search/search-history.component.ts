import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2, Inject, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

import { NGX_SEASON_SEARCH_TOKEN, NGXSeasonSearchComponent, SearchDroppedMetainfo } from "./search.component";

@Component({
    selector: 'ngx-sui-search-history',
    template: `
        <div class="toolbar">
            <span class="label">{{ label }}</span>
            <button ngx-sui-TextButton [btnColor]="color" [btnIcon]="editable ? 'check' : 'edit'" btnSize="sm" btnStyle="flat" [btnText]="editLabel" (click)="handleEditHistoryEvent($event)"></button>
            <button ngx-sui-TextButton [btnColor]="color" btnIcon="trash" btnSize="sm" btnStyle="flat" [btnText]="clearLabel" (click)="handleClearAllHistoryEvent($event)"></button>
        </div>
        <ngx-sui-tag-grid [tgColor]="color" [tgEmptyText]="emptyLabel" (tgTagSelectedChange)="selectedChange.emit($event.value)">
            <a ngx-sui-Tag [tagDeletable]="editable" [tagLabel]="item" tagShape="square" tagSize="sm" (tagDeleteEvent)="handleDeleteHistoryEvent(item)" *ngFor="let item of list"></a>
        </ngx-sui-tag-grid>
    `
})
export class NGXSeasonSearchHistoryComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'shColor' })
    set color(color: NGXSeasonColorPalette | undefined) {
        this._color = color || undefined;
    }

    get color(): NGXSeasonColorPalette | undefined {
        return this._color;
    }

    @Input({ alias: 'shClearLabel' })
    set clearLabel(clearLabel: string | undefined | null) {
        this._clearLabel = clearLabel || undefined;
    }

    get clearLabel(): string | undefined {
        return this._clearLabel;
    }

    @Input({ alias: 'shEditLabel' })
    set editLabel(editLabel: string | undefined | null) {
        this._editLabel = editLabel || undefined;
    }

    get editLabel(): string | undefined {
        return this._editLabel;
    }

    @Input({ alias: 'shEmptyLabel' })
    set emptyLabel(emptyLabel: string | undefined | null) {
        this._emptyLabel = emptyLabel || undefined;
    }

    get emptyLabel(): string | undefined {
        return this._emptyLabel;
    }

    @Input({ alias: 'shLabel' })
    set label(label: string | undefined | null) {
        this._label = label || undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input({ alias: 'shText' })
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonColorPalette | undefined;
    private _clearLabel: string | undefined;
    private _editLabel: string | undefined;
    private _emptyLabel: string | undefined;
    private _label: string | undefined;
    private _text: string | undefined;

    @Output('shSelectedChange')
    selectedChange: EventEmitter<string> = new EventEmitter(true);

    readonly pid: string = this._search.id;

    protected list: string[] = [];
    protected editable: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_SEARCH_TOKEN)
        protected _search: NGXSeasonSearchComponent
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'text') this.setupSearchHistoryText(changes[name].currentValue);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'search-history');

        this.setupSearchHistoryText(this.text);
    }

    protected setupSearchHistoryText(text: string | undefined): void {
        if (text && text.length > 0 && !this.list.includes(text)) this.list.push(text);
    }

    protected handleEditHistoryEvent(event: MouseEvent): void {
        event.preventDefault();

        if (this.pid === this._search.id) {
            this.editable = !this.editable;

            const metainfo: SearchDroppedMetainfo = this._search.droppedChange$.value;
            metainfo.id = this.pid;
            metainfo.editable = this.editable;
            this._search.droppedChange$.next(metainfo);
        }
    }

    protected handleClearAllHistoryEvent(event: MouseEvent): void {
        event.preventDefault();

        if (this.list.length > 0) this.list.splice(0);
    }

    protected handleDeleteHistoryEvent(text: string): void {
        this.list = this.list.filter(item => item !== text);
    }

}

