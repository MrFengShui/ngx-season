import {
    AfterContentInit,
    AfterViewInit,
    Component, ContentChildren, ElementRef,
    HostBinding, HostListener,
    Input, NgZone,
    OnChanges, OnDestroy, QueryList,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";
import {interval, map, Subscription} from "rxjs";

@Component({
    selector: 'octo-matrix-tile-header',
    template: `<ng-content></ng-content>`
})
export class OctopusMatrixTileHeader {

    @HostBinding('class') class: string = 'octo-matrix-tile-header';

}

@Component({
    selector: 'octo-matrix-tile-footer',
    template: `<ng-content></ng-content>`
})
export class OctopusMatrixTileFooter {

    @HostBinding('class') class: string = 'octo-matrix-tile-footer';

}

@Component({
    selector: 'octo-matrix-tile, [octo-matrix-tile]',
    template: `
        <div octoRipple></div>
        <ng-content></ng-content>
    `
})
export class OctopusMatrixTile implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @HostBinding('class') class: string = 'octo-matrix-tile';

    constructor(
        public _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-matrix-tile-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-matrix-tile-${color}`);
        });
    }

}

@Component({
    selector: 'octo-matrix',
    template: `<ng-content select="octo-matrix-tile, [octo-matrix-tile]"></ng-content>`
})
export class OctopusMatrix implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input('octoCols')
    get columns() { return this._columns; }
    set columns(_columns: any) { this._columns = coerceNumberProperty(_columns); }
    private _columns: number = 4;

    @Input('octoGutter') gutter: string = '1rem';
    @Input('octoRatio') ratio: string = '1:1';

    @ContentChildren(OctopusMatrixTile)
    private tiles!: QueryList<OctopusMatrixTile>;

    @HostBinding('class') class: string = 'octo-matrix';

    @HostListener('window:resize')
    private listenWindowResizeChange(): void {
        this.renderRatio(this.ratio, false );
    }

    private subscription!: Subscription;
    private size: number = -1;

    constructor(
        private _element: ElementRef,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['columns']) {
            this.renderColumns(changes['columns'].currentValue);
        }

        if (changes['gutter']) {
            this.renderColumns(changes['gutter'].currentValue);
        }

        if (changes['ratio']) {
            this.renderRatio(changes['ratio'].currentValue);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterContentInit() {
        this.renderRatio(this.ratio);
        this.listenSizeChange();
    }

    ngAfterViewInit() {
        this.renderColumns(this.columns);
        this.renderGutter(this.gutter);
    }

    private listenSizeChange(): void {
        this.subscription = this._zone.runOutsideAngular(() => interval(10)
            .pipe(map(() => {
                if (this._element.nativeElement.clientWidth !== this.size) {
                    this.size = this._element.nativeElement.clientWidth;
                    return true;
                } else {
                    return false;
                }
            }))
            .subscribe(value => {
                if (value) {
                    this.renderRatio(this.ratio, false);
                }
            }));
    }

    private renderColumns(columns: number): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement,
                'grid-template-columns', `repeat(${columns}, 1fr)`);
        });
    }

    private renderGutter(gutter: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'gap', gutter);
        });
    }

    private renderRatio(ratio: string, flag: boolean = true): void {
        if (this.tiles) {
            let task = setTimeout(() => {
                clearTimeout(task);
                let ratios: string[] = ratio.split(':');
                let value: number = coerceNumberProperty(ratios[1]) / coerceNumberProperty(ratios[0]);
                this.tiles.forEach(tile =>
                    this._render.setStyle(tile._element.nativeElement,
                        'height', `${tile._element.nativeElement.clientWidth * value}px`));
            }, flag ? 1000 : 0);
        }
    }

}
