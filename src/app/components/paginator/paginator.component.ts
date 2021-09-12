import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";

import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusPaginatorOption } from "./paginator.service";

@Component({
    selector: 'octopus-paginator',
    templateUrl: './paginator.component.html'
})
export class OctopusPaginator implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('length') length: number | string = 20;
    @Input('options') options: number[] = [5, 10, 15, 20];
    @Input('size') size: number | string = 20;
    @Input('select') select: number | string = 0;

    @Output('sizeChange') sizeChange: EventEmitter<number> = new EventEmitter();
    @Output('selectChange') selectChange: EventEmitter<number> = new EventEmitter();

    @ViewChild('input', { read: ElementRef, static: true })
    private input!: ElementRef<HTMLInputElement>;

    @HostBinding('class') class: string = 'octopus-paginator';

    pageLabel!: string;
    optionLabel!: string;

    private subscription!: Subscription;
    private pages!: number;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        private _option: OctopusPaginatorOption
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.length !== undefined) {
            setTimeout(() => this.renderPage(coerceNumberProperty(this.select), coerceNumberProperty(this.size), coerceNumberProperty(changes.length.currentValue)));
        }

        if (changes.size !== undefined) {
            setTimeout(() => this.renderPage(coerceNumberProperty(this.select), coerceNumberProperty(changes.size.currentValue), coerceNumberProperty(this.length)));
        }

        if (changes.select !== undefined) {
            setTimeout(() => this.selectChange.emit(coerceNumberProperty(changes.select.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderPage(coerceNumberProperty(this.select), coerceNumberProperty(this.size), coerceNumberProperty(this.length));
            this.selectChange.emit(coerceNumberProperty(this.select));
        });
        this.optionLabel = this._option.optionLabel;
    }

    ngAfterViewInit() {
        this.subscription = this.selectChange.asObservable().subscribe(value => {
            this.input.nativeElement.value = (value + 1).toString();
            this.renderPage(value, coerceNumberProperty(this.size), coerceNumberProperty(this.length));
        });
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    listenSelectChange(change: string): void {
        this.renderSelect(0);
        this.renderSize(coerceNumberProperty(change));
        this.renderPage(coerceNumberProperty(this.select), coerceNumberProperty(change), coerceNumberProperty(this.length));
    }

    handleJumpActionEvent(param: string): void {
        let value: number = coerceNumberProperty(param);

        if (value >= 1 && value <= this.pages) {
            this.renderSelect(value - 1);
        }
    }

    handleStepActionEvent(flag: number): void {
        if (flag === -1 && this.select > 0) {
            this.select = coerceNumberProperty(this.select) - 1;
        }

        if (flag === 1 && this.select < this.pages - 1) {
            this.select = coerceNumberProperty(this.select) + 1;
        }

        if (flag === -2) {
            this.select = 0;
        }

        if (flag === 2) {
            this.select = this.pages - 1;
        }

        this.selectChange.emit(coerceNumberProperty(this.select));
    }

    private renderPage(index: number, size: number, length: number): void {
        this.pageLabel = this._option.formatTotalLabel(index + 1, size, length);
        this.pages = this._option.calculatePages(size, length);
    }

    private renderSize(size: number): void {
        this.size = size;
        this.sizeChange.emit(size);
    }

    private renderSelect(select: number): void {
        this.select = select;
        this.selectChange.emit(select);
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-paginator' : `octopus-${prevColor}-paginator`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-paginator`);
    }

}