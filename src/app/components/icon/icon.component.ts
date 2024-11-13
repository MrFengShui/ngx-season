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
    'backup-restore' | 'backup' | 'balance' | 'ban' | 'bank' | 'bar-chart' | 'bar-code' | 'bars' | 'battery' | 'bell-curve' | 'bell' | 'beta' | 'bicycle' | 'bitcoin' | 'block' | 'blocks-group' | 'bluetooth-off' | 'bluetooth-on' | 'boat' | 'bold' | 'bolt' | 'book' | 'bookmark' | 'box-plot' | 'briefcase' | 'bubble-exclamation' | 'bug' | 'building' | 'bullet-list' | 'bullseye' | 'bundle' |
    'calculator' | 'calendar' | 'camera' | 'campervan' | 'cancel' | 'capacitor' | 'car' | 'caravan' | 'caret' | 'cddvd' | 'center-text' | 'certificate' | 'chat-bubble' | 'check-circle' | 'check' | 'checkbox-list' | 'child-arrow' | 'cicd' | 'circle-arrow' | 'circle' | 'clipboard' | 'clock' | 'clone' | 'close' | 'cloud-chart' | 'cloud-network' | 'cloud-scale' | 'cloud-traffic' | 'cloud' | 'cluster' | 'code' | 'cog' | 'coin-bag' | 'collapse-card' | 'collapse' | 'color-palette' | 'color-picker' | 'command' | 'compass' | 'computer' | 'connect' | 'container' | 'container-volume' | 'contract' | 'control-lun' | 'copy' | 'copy-to-clipboard' | 'cpu' | 'credit-card' | 'crosshairs' | 'crown' | 'cursor-arrow' | 'cursor-hand-click' | 'cursor-hand-grab' | 'cursor-hand-open' | 'cursor-hand' | 'cursor-move' | 'curve-chart' |
    'dashboard' | 'data-cluster' | 'date' | 'deploy' | 'design' | 'details' | 'devices' | 'digital-signature' | 'directory' | 'disconnect' | 'display' | 'dna' | 'document' | 'dollar-bill' | 'dollar' | 'dot-circle' | 'download-cloud' | 'download' | 'drag-handle-corner' | 'drag-handle' |
    'edit' | 'ellipsis-horizontal' | 'ellipsis-vertical' | 'email' | 'employee-group' | 'employee' | 'eraser' | 'euro' | 'export' | 'eye-hide' | 'eye-show' | 'eye' |
    'face-happy' | 'face-neutral' | 'face-sad' | 'factory' | 'failure-standard' | 'failure' | 'favorite' | 'file-group' | 'file' | 'filter-off' | 'filter-on' | 'firewall' | 'flag' | 'floppy' | 'form' |
    'grid-view' |
    'heart-broken' | 'heart' | 'help-standard' | 'home' |
    'id-badge' | 'image-gallery' | 'image' | 'import' | 'info-standard' | 'info' | 'internet-of-things' |
    'key' | 'keyboard' |
    'language' | 'library' | 'list-view' | 'list' | 'login' | 'logout' |
    'minus-circle' | 'minus' | 'mobile' | 'moon' | 'mouse' |
    'new' | 'network-globe' | 'no-access' |
    'organization' |
    'paperclip' | 'pause' | 'phone' | 'pin' | 'play' | 'plugin' | 'plus-circle' | 'plus' | 'pound' | 'power' | 'printer' |
    'qrcode' |
    'recycle' | 'rewind' | 'router' | 'ruble' | 'rupee' |
    'savings' | 'search' | 'server' | 'settings' | 'share' | 'shield-check' | 'shield-times' | 'shield' | 'slider' | 'star' | 'step-forward' | 'stop' | 'storage' | 'store' | 'success-standard' | 'success' | 'sun' | 'switch' | 'sync' |
    'table' | 'tablet' | 'tag' | 'tags' | 'target' | 'terminal' | 'thumbs-down' | 'thumbs-up' | 'times-circle' | 'times' | 'tools' | 'trash' | 'tree-view' |
    'unlock' | 'upload-cloud' | 'upload' | 'user' | 'users' |
    'video-camera' | 'video-gallery' | 'volume-down' | 'volume-mute' | 'volume-up' |
    'wallet' | 'warning-standard' | 'warning' | 'wifi-off' | 'wifi-on' | 'world';

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

        const names: string[] = Object.keys(changes);

        if (names.includes('degreeStart') && names.includes('degreeFinal')) this.rotateStateChange$.next(this.rotateState);
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
