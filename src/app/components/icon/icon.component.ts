import { animate, animation, AnimationAnimateRefMetadata, AnimationBuilder, AnimationPlayer, AnimationReferenceMetadata, style, useAnimation } from "@angular/animations";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BehaviorSubject, debounceTime, filter, map, Observable, of, Subject, Subscription, switchMap, zip } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

export const NGX_SEASON_ICONS_REGISTER_TOKEN: InjectionToken<NGXSeasonIconRegister> = new InjectionToken('NGX_SEASON_ICONS_REGISTER_TOKEN');
export const NGX_SEASON_ICONS_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonIconSizeMap> = new InjectionToken('NGX_SEASON_ICONS_REGISTER_TOKEN');

export type NGXSeasonIconName = 
    'accessibility-1' | 'accessibility-2' | 'add-text' | 'administrator' | 'airplane' | 'alarm-off' | 'alarm-on' | 'alert' | 'align-bottom' | 'align-center' | 'align-left' | 'align-left-text' | 'align-middle' | 'align-right' | 'align-right-text' | 'align-top' | 'analytics' | 'angle-double' | 'angle' | 'animation' | 'application' | 'applications' | 'archive' | 'arrow' | 'assign-user' | 'asterisk' | 'atom' | 'attachment' | 'auto' | 'avatar' | 'axis-chart' |
    'bank' | 'bars' | 'bookmark' |
    'caret' | 'check' | 'close' | 'cog' | 'collapse' | 'color-palette' |
    'dashboard' |
    'eye-hide' | 'eye-show' | 'eye' |
    'failure-standard' | 'failure' | 'favorite' |
    'grid-view' |
    'home' |
    'info-standard' | 'info' |
    'minus-circle' | 'minus' | 'moon' |
    'new' |
    'organization' |
    'plus-circle' | 'plus' |
    'share' | 'shield-check' | 'shield-times' | 'shield' | 'star' | 'storage' | 'sun' | 'success-standard' | 'success' | 
    'terminal' | 'times-circle' | 'times' | 'tree-view' | 'thumbs-down' | 'thumbs-up' |
    'user' | 'users' |
    'warning-standard' | 'warning' | 'wifi' | 'world';

export type NGXSeasonIconColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';
export type NGXSeasonIconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxl' | 'xxxl';
export type NGXSeasonIconSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };

type IconsCachePair = { solid: string, outline: string };
type IconsCache = { [key: string]: IconsCachePair };

export class NGXSeasonIconRegister {

    protected static instance: NGXSeasonIconRegister | null = null;

    private subject: Subject<IconsCache> = new BehaviorSubject({});
    
    private cache: IconsCache = {};
    private keys: string[] = [];

    protected constructor() {}

    public addIcon(shape: NGXSeasonIconName): NGXSeasonIconRegister {
        if (this.keys.includes(shape)) throw new Error();

        let subscription: Subscription = this.loadSVGIcon(shape).subscribe({
            next: value => {
                this.keys.push(shape);
                this.cache[shape] = value;
                this.subject.next(this.cache);
            },
            error: () => subscription.unsubscribe(),
            complete: () => subscription.unsubscribe()
        });

        return this;
    }

    public removeIcon(shape: NGXSeasonIconName): NGXSeasonIconRegister {
        if (!this.keys.includes(shape)) throw new Error();

        this.keys.splice(this.keys.indexOf(shape), 1);
        delete this.cache[shape];
        this.subject.next(this.cache);
        return this;
    }

    public findIcon(shape: NGXSeasonIconName): Observable<IconsCachePair> {
        return this.subject.asObservable().pipe(map(cache => cache[shape]), filter(value => value !== undefined), debounceTime(100));
    }

    public findAllIcons(): Observable<IconsCache> {
        return this.subject.asObservable().pipe(debounceTime(100));
    }

    public static newInstance(): NGXSeasonIconRegister {
        if (this.instance === null) this.instance = new NGXSeasonIconRegister();

        return this.instance;
    }

    private loadSVGIcon(shape: NGXSeasonIconName): Observable<IconsCachePair> {
        const solidURL: string = `assets/icons/clarity-${shape.toLowerCase()}-solid.svg`;
        const outlineURL: string = `assets/icons/clarity-${shape.toLowerCase()}-outline.svg`;
        const solidFetch = fromFetch(solidURL).pipe(switchMap(res => res.text()));
        const outlineFetch = fromFetch(outlineURL).pipe(switchMap(res => res.text()));
        return zip(solidFetch, outlineFetch)
            .pipe(map(values => ({ 
                solid: this.fetchSVGContent(values[0]), 
                outline: this.fetchSVGContent(values[1]) 
            })));
    }

    private fetchSVGContent(svgText: string): string {
        const parser: DOMParser = new DOMParser();
        const document: Document = parser.parseFromString(svgText, 'image/svg+xml');
        const element: SVGSVGElement | null = document.querySelector('svg');

        if (element === null) throw new Error();

        return element.innerHTML;
    }

}

type NGXSeasonIconRotateState = { start: number, final: number };

const rotateAnimation: AnimationReferenceMetadata = animation([
    style({ rotate: '{{ start }}deg' }),
    animate('{{ duration }}ms', style({ rotate: '{{ final }}deg' }))
]);

@Component({
    selector: 'ngx-sui-icon',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="setupIconSize(size)" [attr.height]="setupIconSize(size)" viewBox="0 0 36 36" [innerHTML]="svgContent$ | async" #svgBox></svg>
    `
})
export class NGXSeasonIconComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('iconColor')
    set color(color: NGXSeasonIconColor | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonIconColor {
        return this._color;
    }

    @Input('iconDegree')
    set degree(degree: number | string | null) {
        this._degree = degree ? coerceNumberProperty(degree) : 0;
    }

    get degree(): number {
        return this._degree;
    }

    @Input('iconDegreeStart')
    set degreeStart(degreeStart: number | string | null) {
        this._degreeStart = degreeStart ? coerceNumberProperty(degreeStart) : 0;
    }

    get degreeStart(): number {
        return this._degreeStart;
    }

    @Input('iconDegreeFinal')
    set degreeFinal(degreeFinal: number | string | null) {
        this._degreeFinal = degreeFinal ? coerceNumberProperty(degreeFinal) : 0;
    }

    get degreeFinal(): number {
        return this._degreeFinal;
    }

    @Input('iconRotateDuration')
    set rotateDuration(rotateDuration: number | string | null) {
        this._rotateDuration = rotateDuration ? coerceNumberProperty(rotateDuration) : 0;
    }

    get rotateDuration(): number {
        return this._rotateDuration;
    }

    @Input('iconRotateInfinite')
    set rotateInfinite(rotateInfinite: boolean | string | null) {
        this._rotateInfinite = coerceBooleanProperty(rotateInfinite);
    }

    get rotateInfinite(): boolean {
        return this._rotateInfinite;
    }

    @Input('iconShape')
    set shape(shape: NGXSeasonIconName | undefined | null) {
        this._shape = shape ? shape : undefined;
    }

    get shape(): NGXSeasonIconName | undefined {
        return this._shape;
    }

    @Input('iconSolid')
    set solid(solid: boolean | string | null) {
        this._solid = coerceBooleanProperty(solid);
    }

    get solid(): boolean {
        return this._solid;
    }

    @Input('iconSize')
    set size(size: NGXSeasonIconSize | null) {
        this._size = size ? size : 'md';
    }

    get size(): NGXSeasonIconSize {
        return this._size;
    }

    private _color: NGXSeasonIconColor = 'default';
    private _degree: number = 0;
    private _degreeStart: number = 0;
    private _degreeFinal: number = 0;
    private _rotateDuration: number = 0;
    private _rotateInfinite: boolean = false;
    private _shape: NGXSeasonIconName | undefined;
    private _solid: boolean = false;
    private _size: NGXSeasonIconSize = 'md';

    @ViewChild('svgBox', { read: ElementRef, static: true })
    protected svgElement: ElementRef<SVGElement> | undefined;

    protected player: AnimationPlayer | undefined;
    protected rotateState: NGXSeasonIconRotateState = { start: this.degreeStart, final: this.degreeFinal };

    protected svgContent$: Observable<SafeHtml> | undefined;
    protected rotateStateChange$: Subject<NGXSeasonIconRotateState> = new BehaviorSubject(this.rotateState);

    private rotateState$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_ICONS_REGISTER_TOKEN)
        protected _register: NGXSeasonIconRegister,
        @Inject(NGX_SEASON_ICONS_SIZE_MAP_TOKEN)
        protected _iconSizeMap: NGXSeasonIconSizeMap
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeIconColor(changes[name].currentValue as NGXSeasonIconColor);

            if (name === 'degree') this.changeIconDegree(coerceNumberProperty(changes[name].currentValue));
    
            if (name === 'shape') this.setupIconContent(changes[name].currentValue, this.solid);
    
            if (name === 'solid') this.setupIconContent(this.shape, coerceBooleanProperty(changes[name].currentValue));
            
            if (name === 'degreeStart') this.rotateState.start = coerceNumberProperty(changes[name].currentValue);

            if (name === 'degreeFinal') this.rotateState.final = coerceNumberProperty(changes[name].currentValue);
        }

        this.rotateStateChange$.next(this.rotateState);
    }

    ngOnDestroy(): void {
        this.player?.destroy();
        this.rotateState$?.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'icon');
        this.changeIconColor(this.color);
        this.changeIconDegree(this.degree);
        this.setupIconContent(this.shape, this.solid);
        this.listenRotateStartFinalChange(this.svgElement?.nativeElement);
        this.player?.onDone(() => {
            this._renderer.setStyle(this.svgElement?.nativeElement, 'transform', `rotate(${this.degreeFinal}deg)`);

            this.player?.destroy();
            this.player = undefined;
        });
        this.player?.onStart(() => this._renderer.setStyle(this.svgElement?.nativeElement, 'transform', `rotate(${this.degreeStart}deg)`));
    }

    protected changeIconColor(color: NGXSeasonIconColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-icon-color', color);
    }

    protected changeIconDegree(degree: number): void {
        this._renderer.setStyle(this.svgElement?.nativeElement, 'transform', `rotate(${degree}deg)`);
    }

    protected setupIconContent(shape: NGXSeasonIconName | undefined, solid: boolean): void {
        this.svgContent$ = shape ? this._register.findIcon(shape).pipe(map(pair => 
            this._sanitizer.bypassSecurityTrustHtml(solid ? pair.solid : pair.outline))) : of();
    }

    protected setupIconSize(size: NGXSeasonIconSize): number {
        return this._iconSizeMap[size];
    }

    private listenRotateStartFinalChange(element: SVGElement | undefined): void {
        this._ngZone.runOutsideAngular(() => 
            this.rotateState$ = this.rotateStateChange$.asObservable().pipe(debounceTime(100)).
                subscribe(metainfo => 
                    this._ngZone.run(() => {
                        const animation: AnimationAnimateRefMetadata = useAnimation(rotateAnimation, { params: { duration: this.rotateDuration, start: metainfo.start, final: metainfo.final } });
                        this.player = this._builder.build(animation).create(element);
                        this.player.play();
                    })));
    }

}