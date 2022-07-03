import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter,
    HostBinding,
    Input,
    OnChanges, Output,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {coerceNumberProperty, coerceStringArray} from "@angular/cdk/coercion";

import {OctopusColorPalette} from "../global/enums.utils";

export type OctopusPageEvent = {currIndex: number, prevIndex: number, size: number, length: number};

@Component({
    selector: 'octo-paginator',
    template: `
        <span class="flex-fill">{{pageLabel}}</span>
        <ng-container>
            <span class="mr-100">{{sizeLabel}}</span>
            <button octo-solid-btn [octoColor]="color" class="w-10" [cdkMenuTriggerFor]="menu">
                <span class="flex-fill">{{size}}</span>
                <octo-icon octoSize="1rem">arrow_drop_down_circle</octo-icon>
            </button>
            <ng-template #menu>
                <div class="octo-page-size-menu octo-shadow-4" cdkMenu>
                    <button octo-solid-btn [octoColor]="size === item ? color : 'base'" cdkMenuItem
                            (click)="selectSize(item)" *ngFor="let item of range">{{item}}</button>
                </div>
            </ng-template>
        </ng-container>
        <span class="vw-5"></span>
        <button octo-btn octoShape="ring" style="width: 3rem;height: 3rem;" [disabled]="index === 0" (click)="first()">
            <octo-icon>first_page</octo-icon>
        </button>
        <button octo-btn octoShape="ring" style="width: 3rem;height: 3rem;" [disabled]="index === 0" (click)="decrement()">
            <octo-icon>navigate_before</octo-icon>
        </button>
        <button octo-btn octoShape="ring" style="width: 3rem;height: 3rem;" [disabled]="index === pages(length, size) - 1"
                (click)="increment()">
            <octo-icon>navigate_next</octo-icon>
        </button>
        <button octo-btn octoShape="ring" style="width: 3rem;height: 3rem;" [disabled]="index === pages(length, size) - 1"
                (click)="last()">
            <octo-icon>last_page</octo-icon>
        </button>
    `
})
export class OctopusPaginator implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';

    @Input('octoIndex')
    get index() { return this._index; }
    set index(_index: any) { this._index = coerceNumberProperty(_index); }
    private _index: number = 0;

    @Input('octoLength')
    get length() { return this._length; }
    set length(_length: any) { this._length = coerceNumberProperty(_length); }
    private _length: number = 0;

    @Input('octoSize')
    get size() { return this._size; }
    set size(_size: any) { this._size = coerceNumberProperty(_size); }
    private _size: number = 10;

    @Input('octoRange')
    get range() { return this._range; }
    set range(_range: any) { this._range = Array.from(coerceStringArray(_range)).map(item => coerceNumberProperty(item)); }
    private _range: number[] = [5, 10, 20, 25, 50, 100];

    @Input('octoPageLabel') pageLabel: string = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    @Input('octoSizeLabel') sizeLabel: string = 'Items on Page';

    @Output('octoPageChange') change: EventEmitter<OctopusPageEvent> = new EventEmitter<OctopusPageEvent>();

    @HostBinding('class') class: string = 'octo-paginator';

    private prevIndex: number = -1;

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['length']) {
            this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(changes['length'].currentValue / this.size)}`;
            this.prevIndex = -1;
            this.index = 0;
            this.change.emit({
                currIndex: this.index, prevIndex: this.prevIndex,
                length: changes['length'].currentValue, size: this.size
            });
        }

        if (changes['size']) {
            this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / changes['size'].currentValue)}`;
            this.prevIndex = -1;
            this.index = 0;
            this.change.emit({
                currIndex: this.index, prevIndex: this.prevIndex,
                length: this.length, size: changes['size'].currentValue
            });
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-shadow-4');
    }

    selectSize(size: number): void {
        this.prevIndex = -1;
        this.index = 0;
        this.size = size;
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex, length: this.length, size: this.size});
        this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    }

    decrement(): void {
        this.prevIndex = this.index;
        this.index = Math.max(0, this.index - 1);
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex, length: this.length, size: this.size});
        this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    }

    increment(): void {
        this.prevIndex = this.index;
        this.index = Math.min(Math.ceil(this.length / this.size) - 1, this.index + 1);
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex, length: this.length, size: this.size});
        this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    }

    first(): void {
        this.prevIndex = this.index;
        this.index = 0;
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex, length: this.length, size: this.size});
        this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    }

    last(): void {
        this.prevIndex = this.index;
        this.index = Math.ceil(this.length / this.size) - 1;
        this.change.emit({currIndex: this.index, prevIndex: this.prevIndex, length: this.length, size: this.size});
        this.pageLabel = `Page: ${this.index + 1}, Total: ${Math.ceil(this.length / this.size)}`;
    }

    pages(length: number, size: number): number {
        return Math.ceil(length / size);
    }

}
