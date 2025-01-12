import { coerceArray, coerceCssPixelValue, coerceStringArray } from "@angular/cdk/coercion";
import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, debounceTime, Subscription } from "rxjs";

type LayoutGridColumnRowSizes = { colSizes?: string[], rowSizes?: string[] };

@Directive()
export abstract class NGXSeasonBaseLayoutDirective {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

}

@Directive({
    selector: 'div[ngx-sui-GridLayout]'
})
export class NGXSeasonGridLayoutDirective extends NGXSeasonBaseLayoutDirective implements OnChanges, OnDestroy, AfterViewInit {

    @Input({ alias: 'layoutGridColSizes', required: true })
    set colSizes(colSizes: string[] | undefined | null) {
        this._colSizes = coerceStringArray(colSizes)  || undefined;
    }

    get colSizes(): string[] | undefined {
        return this._colSizes;
    }

    @Input({ alias: 'layoutGridRowSizes', required: true })
    set rowSizes(rowSizes: string[] | undefined | null) {
        this._rowSizes = coerceStringArray(rowSizes) || undefined;
    }

    get rowSizes(): string[] | undefined {
        return this._rowSizes;
    }

    @Input({ alias: 'layoutGridGap' })
    set gap(gap: [number, number] | undefined | null) {
        this._gap = gap || [0, 0];
    }

    get gap(): [number, number] {
        return this._gap;
    }

    private _colSizes: string[] | undefined;
    private _rowSizes: string[] | undefined;
    private _gap: [number, number] = [0, 0];

    private gridColRowSizesChange$: BehaviorSubject<LayoutGridColumnRowSizes> = new BehaviorSubject<LayoutGridColumnRowSizes>({});
    private gridColRowSizes$: Subscription = Subscription.EMPTY;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {
        super(_element, _renderer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'gap') this.setupLayoutGridGap(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.gridColRowSizes$.unsubscribe();

        this.gridColRowSizesChange$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.setStyle(this._element.nativeElement, 'display', 'grid');

        this.gridColRowSizesChange$.next({ colSizes: this.colSizes, rowSizes: this.rowSizes });

        this.setupLayoutGridGap(this.gap);
        this.listenLayoutGridColumnRowSizesChange();
    }

    protected setupLayoutGrid(sizes: LayoutGridColumnRowSizes): void {
        if (!sizes.colSizes || !sizes.rowSizes) throw new Error();

        const element = this._element.nativeElement;
        this._renderer.setStyle(element, 'grid-template-columns', sizes.colSizes.join(' '));
        this._renderer.setStyle(element, 'grid-template-rows', sizes.rowSizes.join(' '));
    }

    protected setupLayoutGridGap(gap: [number, number]): void {
        const element = this._element.nativeElement;
        this._renderer.setStyle(element, 'column-gap', coerceCssPixelValue(gap[0]));
        this._renderer.setStyle(element, 'row-gap', coerceCssPixelValue(gap[1]));
    }

    private listenLayoutGridColumnRowSizesChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.gridColRowSizes$ = this.gridColRowSizesChange$.asObservable().pipe(debounceTime(100))
                .subscribe(change => this.setupLayoutGrid(change)));
    }

}
