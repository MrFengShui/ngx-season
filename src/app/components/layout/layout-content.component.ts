import { AnimationReferenceMetadata, animation, style, animate, AnimationBuilder, AnimationPlayer, useAnimation } from "@angular/animations";
import { coerceNumberProperty, coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, SimpleChanges } from "@angular/core";


export const sideBoxAnimate: AnimationReferenceMetadata = animation(
    [
        style({ width: '{{ start }}' }),
        animate('{{ duration }}', style({ width: '{{ final }}' }))
    ],
    { params: { start: 0, final: 0, duration: 0 } }
);@Component({
    selector: 'ngx-sui-layout-content',
    template: `
        <div class="ngx-sui-content-side" ngx-sui-Scrollbar [scrollBarAxis]="toggled ? 'xy-axis' : 'y-axis'" #sideBox><ng-content select="contentSide"></ng-content></div>
        <div class="ngx-sui-content-area" ngx-sui-Scrollbar scrollBarAxis="y-axis" #areaBox><ng-content select="contentArea"></ng-content></div>
    `
})
export class NGXSeasonLayoutContentComponent implements OnChanges, AfterViewInit {

    @Input('contentDuration')
    set duration(duration: number | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('contentRatio')
    set ratio(ratio: number | string) {
        this._ratio = coerceNumberProperty(ratio);
    }

    get ratio(): number {
        return this._ratio;
    }

    @Input('contentSideWidth')
    set sideWidth(sideWidth: number | string) {
        this._sideWidth = coerceNumberProperty(sideWidth);
    }

    get sideWidth(): number {
        return this._sideWidth;
    }

    @Input('contentToggled')
    set toggled(sideToggled: boolean | string) {
        this._toggled = coerceBooleanProperty(sideToggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    @ViewChild('sideBox', { read: ElementRef, static: true })
    protected sideBox: ElementRef<HTMLDivElement> | undefined;

    @ViewChild('areaBox', { read: ElementRef, static: true })
    protected areaBox: ElementRef<HTMLDivElement> | undefined;

    private _duration: number = 125;
    private _ratio: number = 0.15;
    private _sideWidth: number = 0;
    private _toggled: boolean = false;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('ratio')) {
            this.changeContentRatio(changes['ratio'].currentValue as number);
        }

        if (keys.includes('sideWidth')) {
            this.changeContentSideWidth(changes['sideWidth'].currentValue as number);
        }

        if (keys.includes('toggled')) {
            this.changeContentSideToggled(changes['toggled'].currentValue as boolean, this.duration);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'ngx-sui-content');
        this.changeContentRatio(this.ratio);
        this.changeContentSideWidth(this.sideWidth);
        this.changeContentSideToggled(this.toggled, this.duration);
    }

    private changeContentRatio(ratio: number): void {
        if (ratio > 1 || !this.sideBox || !this.areaBox) throw new Error();

        this._renderer.setStyle(this.sideBox.nativeElement, 'width', `${100 * ratio}%`);
        this._renderer.setStyle(this.areaBox.nativeElement, 'width', `${100 * (1 - ratio)}%`);
    }

    private changeContentSideWidth(sideWidth: number): void {
        if (sideWidth < 0 || !this.sideBox || !this.areaBox) throw new Error();

        if (sideWidth === 0) {
            this.changeContentRatio(this.ratio);
        } else {
            this._renderer.setStyle(this.sideBox.nativeElement, 'width', `${sideWidth}px`);
            this._renderer.setStyle(this.sideBox.nativeElement, 'min-width', `${sideWidth}px`);
            this._renderer.setStyle(this.sideBox.nativeElement, 'max-width', `${sideWidth}px`);
            this._renderer.setStyle(this.areaBox.nativeElement, 'flex', '1 1 auto');
            this._renderer.removeStyle(this.areaBox.nativeElement, 'width');
        }
    }

    private changeContentSideToggled(toggled: boolean, duration: number): void {
        if (this.sideWidth < 0 || !this.sideBox || !this.areaBox) throw new Error();

        const element: HTMLElement = this.sideBox.nativeElement;
        let player: AnimationPlayer | null;

        player = this._builder
            .build(useAnimation(sideBoxAnimate, {
                params: {
                    start: toggled ? `${24 + 2 * 16}px` : `${this._sideWidth}px`,
                    final: toggled ? `${this._sideWidth}px` : `${24 + 2 * 16}px`,
                    duration: `${duration}ms`
                }
            }))
            .create(element);
        player.onDone(() => player = null);
        player.play();
    }

}

