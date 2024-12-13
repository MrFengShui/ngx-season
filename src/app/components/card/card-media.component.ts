import { coerceNumberProperty } from "@angular/cdk/coercion";
import { DomPortal } from "@angular/cdk/portal";
import { AfterViewInit, ElementRef, Renderer2, Component, Input, OnChanges, SimpleChanges, RendererStyleFlags2, ContentChild, Directive, AfterContentInit, HostListener, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Directive({
    selector: 'img[ngx-sui-CardMedia], video[ngx-sui-CardMedia], iframe[ngx-sui-CardMedia]'
})
export class NGXSeasonCardMediaDirective implements AfterViewInit {

    @Input({ alias: 'cmSrc' })
    set source(source: string | undefined | null) {
        this._source = source || undefined;
    }

    get source(): string | undefined {
        return this._source;
    }

    private _source: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._element.nativeElement.src = this.source || '';
    }

    fetchHostElement(): HTMLElement {
        const rootElement: HTMLElement = this._renderer.createElement('div');
        const hostElement: HTMLElement = this._element.nativeElement;
        this._renderer.appendChild(rootElement, hostElement);
        return hostElement;
    }

    canPlay(): boolean {
        const element: HTMLElement = this._element.nativeElement;
        return element instanceof HTMLVideoElement || element instanceof HTMLAudioElement;
    }

    play(): void {
        if (this.canPlay()) {
            const element: HTMLVideoElement | HTMLAudioElement = this._element.nativeElement;
            element.play();
        }
    }

    pause(): void {
        if (this.canPlay()) {
            const element: HTMLVideoElement | HTMLAudioElement = this._element.nativeElement;
            element.pause();
        }
    }

    isPaused(): boolean {
        if (this.canPlay()) {
            const element: HTMLVideoElement | HTMLAudioElement = this._element.nativeElement;
            return element.paused;
        }

        return false;
    }

    isCompleted(): Observable<boolean> {
        return new Observable(subscriber => {
            if (this.canPlay()) {
                const element: HTMLVideoElement | HTMLAudioElement = this._element.nativeElement;
                element.onended = () => {
                    subscriber.next(element.ended);
                    subscriber.complete();
                }
            }
        });

    }

}

@Component({
    selector: 'ngx-sui-card-media',
    template: `
        <ng-container [cdkPortalOutlet]="videoPortal"></ng-container>
        <span class="media-control-wrapper" *ngIf="media?.canPlay()">
            <button ngx-sui-IconButton [btnIcon]="media?.isPaused() ? 'play' : 'pause'" btnSize="xl" btnStyle="flat" [class.none]="!(isHover$.asObservable() | async)" (click)="media?.isPaused() ? media?.play() : media?.pause()"></button>
        </span>
        <ng-template><ng-content select="img[ngx-sui-CardMedia], video[ngx-sui-CardMedia], audio[ngx-sui-CardMedia]"></ng-content></ng-template>
    `
})
export class NGXSeasonCardMediaComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input({ alias: 'cmRatio' })
    set ratio(ratio: number | string | undefined | null) {
        this._ratio = coerceNumberProperty(ratio);
    }

    get ratio(): number {
        return this._ratio;
    }

    private _ratio: number = 4 / 3;

    @ContentChild(NGXSeasonCardMediaDirective)
    protected media: NGXSeasonCardMediaDirective | undefined;

    protected imagePortal: DomPortal | undefined;
    protected videoPortal: DomPortal | undefined;
    protected audioPortal: DomPortal | undefined;

    @HostListener('mouseenter')
    protected listenMouseMoveInEvent(): void {
        this.isHover$.next(true);
    }

    @HostListener('mouseleave')
    protected listenMouseMoveOutEvent(): void {
        this.isHover$.next(false);
    }

    protected isHover$: Subject<boolean> = new BehaviorSubject(false);

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'ratio') this.changeCardMediaRatio(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngAfterContentInit(): void {
        if (this.media) this.videoPortal = new DomPortal(this.media.fetchHostElement());
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-media');

        this.changeCardMediaRatio(this.ratio);
    }

    protected changeCardMediaRatio(ratio: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--card-media-aspect-ratio', ratio, RendererStyleFlags2.DashCase);
    }

}
