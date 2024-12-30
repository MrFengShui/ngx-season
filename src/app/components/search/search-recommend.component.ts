import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from "@angular/core";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-search-recommend',
    template: `
        <div class="toolbar">
            <span class="label">{{ label }}</span>
            <button ngx-sui-TextButton [btnColor]="color" btnIcon="sync" btnSize="sm" btnStyle="flat" [btnText]="changeLabel" (click)="handleChangeEvent($event)"></button>
        </div>
        <ngx-sui-tag-grid [tgColor]="color" [tgEmptyText]="empty" (tgTagSelectedChange)="selectedChange.emit($event.value)">
            <a ngx-sui-Tag [tagLabel]="value" tagShape="square" tagSize="sm" *ngFor="let value of values"></a>
        </ngx-sui-tag-grid>
    `
})
export class NGXSeasonSearchRecommendComponent implements AfterViewInit {

    @Input({ alias: 'srColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'srEmptyText', required: true })
    set empty(empty: string | undefined | null) {
        this._empty = empty || undefined;
    }

    get empty(): string | undefined {
        return this._empty;
    }

    @Input({ alias: 'srLabel', required: true })
    set label(label: string | undefined | null) {
        this._label = label || undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input({ alias: 'srChangeLabel' })
    set changeLabel(updateLabel: string | undefined | null) {
        this._changeLabel = updateLabel || undefined;
    }

    get changeLabel(): string | undefined {
        return this._changeLabel;
    }

    @Input({ alias: 'srValues' })
    set values(values: string[] | undefined | null) {
        this._values = values || [];
    }

    get values(): string[] {
        return this._values;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _empty: string | undefined;
    private _label: string | undefined;
    private _changeLabel: string | undefined;
    private _values: string[] = [];

    @Output('srChangeEvent')
    changeEvent: EventEmitter<void> = new EventEmitter(true);

    @Output('srSelectedChange')
    selectedChange: EventEmitter<string> = new EventEmitter(true);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'search-recommend');
    }

    handleChangeEvent(event: MouseEvent): void {
        event.preventDefault();
        this.changeEvent.emit();
    }

}
