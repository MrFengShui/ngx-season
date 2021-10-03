import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

type ScoreState = 'full' | 'half' | 'none';

@Component({
    selector: 'octopus-score',
    template: `
        <span class="material-icons" (click)="handleSelectActionEvent($event, i + 1)" [style.font-size]="size + 'px'" [style.line-height]="size + 'px'"
            *ngFor="let item of line; index as i">{{item === 'full' ? 'star' : item === 'half' ? 'star_half' : 'star_outline'}}</span>
    `
})
export class OctopusScore implements OnChanges, OnInit, OnDestroy {

    @Input('color') color: ColorPalette = 'base';

    @Input('count')
    get count(): any { return this._count; }
    set count(_count: any) { this._count = coerceNumberProperty(_count); }
    private _count: any = 10;

    @Input('score')
    get score(): any { return this._score; }
    set score(_score: any) { this._score = coerceNumberProperty(_score); }
    private _score: any = 0;

    @Input('size')
    get size(): any { return this._size; }
    set size(_size: any) { this._size = coerceNumberProperty(_size); }
    private _size: any = 32;

    @Output() scoreChange: EventEmitter<number> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-score';

    line: ScoreState[] = [];

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.count !== undefined) {
            setTimeout(() => this.line = this.renderLine(this.score, changes.count.currentValue));
        }

        if (changes.score !== undefined) {
            setTimeout(() => this.line = this.renderLine(changes.score.currentValue, this.count));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.line = this.renderLine(this.score, this.count);
        });
    }

    ngOnDestroy() {
        this.scoreChange.complete();
    }

    handleSelectActionEvent(event: MouseEvent, index: number): void {
        let score: number = event.offsetX <= this.size * 0.5 ? index - 0.5 : index;

        if (index === 1) {
            if (this.line[0] === 'full') {
                score = event.offsetX <= this.size * 0.5 ? 0.5 : 0;
            }

            if (this.line[0] === 'half') {
                score = event.offsetX > this.size * 0.5 ? 1 : 0;
            }
        }

        this.line = this.renderLine(score, this.count);
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-score' : `octopus-${prevColor}-score`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-score`);
    }

    private renderLine(score: number, count: number, list: ScoreState[] = []): ScoreState[] {
        if (score >= 0 && score <= count) {
            this.scoreChange.emit(score);

            let rmd: number = score - Math.floor(score);
            list = list.concat(new Array(Math.floor(score)).fill('full'));

            if (rmd !== 0) {
                list = list.concat(new Array('half'));
            }

            list = list.concat(new Array(count - Math.ceil(score)).fill('none'));
            return list;
        }

        return new Array(count).fill('none');
    }

}