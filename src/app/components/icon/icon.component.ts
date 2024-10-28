import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BehaviorSubject, debounceTime, filter, map, Observable, of, Subject, Subscription, switchMap, zip } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

export const NGX_SEASON_ICONS_REGISTER_TOKEN: InjectionToken<NGXSeasonIconRegister> = new InjectionToken('NGX_SEASON_ICONS_REGISTER_TOKEN');
export const NGX_SEASON_ICONS_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonIconSizeMap> = new InjectionToken('NGX_SEASON_ICONS_REGISTER_TOKEN');

type IconsCachePair = { solid: string, outline: string };
type IconsCache = { [key: string]: IconsCachePair };

export class NGXSeasonIconRegister {

    protected static instance: NGXSeasonIconRegister | null = null;

    private subject: Subject<IconsCache> = new BehaviorSubject({});
    
    private cache: IconsCache = {};
    private keys: string[] = [];

    protected constructor() {}

    public addIcon(shape: string): NGXSeasonIconRegister {
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

    public removeIcon(shape: string): NGXSeasonIconRegister {
        if (!this.keys.includes(shape)) throw new Error();

        this.keys.splice(this.keys.indexOf(shape), 1);
        delete this.cache[shape];
        this.subject.next(this.cache);
        return this;
    }

    public findIcon(shape: string): Observable<IconsCachePair> {
        return this.subject.asObservable().pipe(map(cache => cache[shape]), filter(value => value !== undefined), debounceTime(100));
    }

    public findAllIcons(): Observable<IconsCache> {
        return this.subject.asObservable().pipe(debounceTime(100));
    }

    public static newInstance(): NGXSeasonIconRegister {
        if (this.instance === null) this.instance = new NGXSeasonIconRegister();

        return this.instance;
    }

    private loadSVGIcon(shape: string): Observable<IconsCachePair> {
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

type NGXSeasonIconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxl';
type NGXSeasonIconSizeMap = { sm: number, md: number, lg: number, xl: number, xxl: number, xxxl: number };

@Component({
    selector: 'ngx-sui-icon',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="setupIconSize(size)" [attr.height]="setupIconSize(size)" viewBox="0 0 36 36" [innerHTML]="svgContent$ | async" #svgBox></svg>
    `
})
export class NGXSeasonIconComponent implements OnChanges, AfterViewInit {

    @Input('iconDegree')
    set degree(degree: number | string) {
        this._degree = coerceNumberProperty(degree);
    }

    get degree(): number {
        return this._degree;
    }

    @Input('iconShape')
    set shape(shape: string | undefined | null) {
        this._shape = shape ? shape : '';
    }

    get shape(): string | undefined {
        return this._shape;
    }

    @Input('iconSolid')
    set solid(solid: boolean | string) {
        this._solid = coerceBooleanProperty(solid);
    }

    get solid(): boolean {
        return this._solid;
    }

    @Input('iconSize')
    set size(size: NGXSeasonIconSize) {
        this._size = size;
    }

    get size(): NGXSeasonIconSize {
        return this._size;
    }

    private _degree: number = 0;
    private _shape: string | undefined;
    private _solid: boolean = false;
    private _size: NGXSeasonIconSize = 'md';

    @ViewChild('svgBox', { read: ElementRef, static: true })
    protected svgElement: ElementRef<SVGSVGElement> | undefined;

    protected svgContent$: Observable<SafeHtml> | undefined;

    constructor(
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_ICONS_REGISTER_TOKEN)
        protected _register: NGXSeasonIconRegister,
        @Inject(NGX_SEASON_ICONS_SIZE_MAP_TOKEN)
        protected _iconSizeMap: NGXSeasonIconSizeMap
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('degree')) {
            this.changeIconDegree(changes['degree'].currentValue as number);
        }
        
        if (keys.includes('shape')) {
            this.setupIconContent(changes['shape'].currentValue, this.solid);
        }

        if (keys.includes('solid')) {
            this.setupIconContent(this.shape, changes['solid'].currentValue);
        }
        
        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'icon');
        this.changeIconDegree(this.degree);
        this.setupIconContent(this.shape, this.solid);
    }

    protected changeIconDegree(degree: number): void {
        this._renderer.setStyle(this._element.nativeElement, 'rotate', `${degree}deg`);
    }

    protected setupIconContent(shape: string | undefined, solid: boolean): void {
        this.svgContent$ = shape ? this._register.findIcon(shape).pipe(map(pair => 
            this._sanitizer.bypassSecurityTrustHtml(solid ? pair.solid : pair.outline))) : of();
    }

    protected setupIconSize(size: NGXSeasonIconSize): number {
        return this._iconSizeMap[size];
    }

}