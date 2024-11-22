import { DragDrop, DragRef } from "@angular/cdk/drag-drop";
import { BlockScrollStrategy, GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { animate, animation, AnimationBuilder, AnimationPlayer, style, useAnimation } from "@angular/animations";
import { ComponentRef, Inject, Injectable, InjectionToken, Injector } from "@angular/core";
import { AsyncSubject, BehaviorSubject, debounceTime, map, Observable, Subject, Subscription } from "rxjs";

import { NGXSeasonModalContainerComponent } from "./modal.component";

export const NGX_SEASON_MODAL_DATA_TOKEN: InjectionToken<any> = new InjectionToken('NGX_SEASON_MODAL_DATA_TOKEN');
export const NGX_SEASON_MODAL_SIZE_MAP_TOKEN: InjectionToken<NGXSeasonModalSizeMap> = new InjectionToken('NGX_SEASON_MODAL_SIZE_MAP_TOKEN');

export type NGXSeasonModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fs';
export type NGXSeasonModalSizeMap = { sm: NGXSeasonModalDimension, md: NGXSeasonModalDimension, lg: NGXSeasonModalDimension, xl: NGXSeasonModalDimension, fs: NGXSeasonModalDimension };

type NGXSeasonModalDimension = { width: number | string, height: number | string };

export interface NGXSeasonModalConfig {

    allowAnimation?: boolean;
    animateDuration?: number;

    allowDragDrop?: boolean;
    dragDelay?: number;

    allowBackdropClick?: boolean;
    backdropClass?: string | string[];
    hasBackdrop?: boolean;

    panelClass?: string | string[];

    size?: NGXSeasonModalSize;
    width?: number | string;
    height?: number | string;

}

export class NGXSeasonModalConfigBuilder {

    private config: NGXSeasonModalConfig = {};

    constructor(protected _sizeMap: NGXSeasonModalSizeMap) {}

    setupAllowAnimation(flag: boolean): NGXSeasonModalConfigBuilder {
        this.config.allowAnimation = flag;
        return this;
    }

    setupAnimateDuration(value: number): NGXSeasonModalConfigBuilder {
        this.config.animateDuration = value;
        return this;
    }

    setupAllowDragDrop(flag: boolean): NGXSeasonModalConfigBuilder {
        this.config.allowDragDrop = flag;
        return this;
    }

    setupDrapDelay(value: number): NGXSeasonModalConfigBuilder {
        this.config.dragDelay = value;
        return this;
    }

    setupAllowBackdropClick(flag: boolean): NGXSeasonModalConfigBuilder {
        this.config.allowAnimation = flag;
        return this;
    }

    setupBackdropClass(values: string | string[]): NGXSeasonModalConfigBuilder {
        this.config.backdropClass = this.config.backdropClass?.concat(...values);
        return this;
    }

    setupHasBackdrop(flag: boolean): NGXSeasonModalConfigBuilder {
        this.config.hasBackdrop = flag;
        return this;
    }

    setupPanelClass(values: string | string[]): NGXSeasonModalConfigBuilder {
        this.config.panelClass = this.config.panelClass?.concat(...values);
        return this;
    }

    setupSize(value: NGXSeasonModalSize): NGXSeasonModalConfigBuilder {
        this.config.size = value;
        return this;
    }

    setupWidth(value: number | string): NGXSeasonModalConfigBuilder {
        this.config.width = value;
        return this;
    }

    setupHeight(value: number | string): NGXSeasonModalConfigBuilder {
        this.config.height = value;
        return this;
    }

    initial(): NGXSeasonModalConfigBuilder {
        this.config = {
            allowAnimation: false, animateDuration: 0,
            allowDragDrop: false, dragDelay: 0,
            allowBackdropClick: false, backdropClass: ['modal-backdrop'], hasBackdrop: true,
            panelClass: ['modal'] ,
            width: '50vw', height: '50vh'
        };
        return this;
    }

    mixin(config: NGXSeasonModalConfig): NGXSeasonModalConfigBuilder {
        const animateDuration: number = config.allowAnimation ? (config.animateDuration || 250) : 0;
        const dragDelay: number = config.allowDragDrop ? (config.dragDelay || 250) : 0;
        const dimension: NGXSeasonModalDimension = config.size
            ? this._sizeMap[config.size]
            : { width: config.width || '50vw', height: config.height || '50vh' };
        this.config = { ...this.config, ...config, ...dimension, animateDuration, dragDelay };
        return this;
    }

    build(): NGXSeasonModalConfig {
        return this.config;
    }

}

@Injectable({ providedIn: 'root' })
export class NGXSeasonModalService<D = any> {

    private readonly GLOBAL_POSITION_STRATEGY: GlobalPositionStrategy = this._overlay.position().global().centerHorizontally().centerVertically();
    private readonly BLOCK_SCROLL_STRATEGY: BlockScrollStrategy = this._overlay.scrollStrategies.block();

    private builder: NGXSeasonModalConfigBuilder = new NGXSeasonModalConfigBuilder(this._sizeMap);

    constructor(
        protected _builder: AnimationBuilder,
        protected _injector: Injector,
        protected _dragdrop: DragDrop,
        protected _overlay: Overlay,

        @Inject(NGX_SEASON_MODAL_SIZE_MAP_TOKEN)
        protected _sizeMap: NGXSeasonModalSizeMap
    ) {}

    configBuilder(): NGXSeasonModalConfigBuilder {
        return this.builder;
    }

    display<T extends NGXSeasonModalContainerComponent, R = unknown>(component: ComponentType<T>, config?: NGXSeasonModalConfig, data?: D): NGXSeasonModalRef<T, D, R> {
        const modalConfig = config ? this.builder.initial().mixin(config).build() : this.builder.initial().build();
        const overlayConfig: OverlayConfig = {
            positionStrategy: this.GLOBAL_POSITION_STRATEGY, scrollStrategy: this.BLOCK_SCROLL_STRATEGY,
            backdropClass: modalConfig.backdropClass, panelClass: modalConfig.panelClass, hasBackdrop: modalConfig.hasBackdrop, width: modalConfig.width, height: modalConfig.height
        };
        return this.createOverlayRef(component, data, overlayConfig, modalConfig);
    }

    private createOverlayRef<T, R>(component: ComponentType<T>, data: D | undefined, config: OverlayConfig, modalConfig: NGXSeasonModalConfig): NGXSeasonModalRef<T, D, R> {
        const overlayRef: OverlayRef = this._overlay.create(config);
        const modalRef: NGXSeasonModalRef<T, D, R> = new NGXSeasonModalRef(this._builder, this._dragdrop, overlayRef, modalConfig);
        const injector: Injector = Injector.create({
            parent: this._injector,
            providers: [
                { provide: NGX_SEASON_MODAL_DATA_TOKEN, useValue: data },
                { provide: NGXSeasonModalRef, useValue: modalRef }
            ]
        });
        const portal: ComponentPortal<T> = new ComponentPortal(component, null, injector);
        const componentRef: ComponentRef<T> = overlayRef.attach(portal);
        const container: NGXSeasonModalContainerComponent = componentRef.instance as NGXSeasonModalContainerComponent;
        container.setupModalContainerClass();
        modalRef.display(componentRef);
        return modalRef;
    }

}

const fadeInOutAnimation = animation([
    style({ scale: '{{ scaleStart }}', opacity: '{{ opacityStart }}' }),
    animate('{{ duration }}ms', style({ scale: '{{ scaleFinal }}', opacity: '{{ opacityFinal }}' }))
]);
const resizeAnimation = animation([
    style({ width: '{{ widthStart }}', height: '{{ heightStart }}' }),
    animate('{{ duration }}ms', style({ width: '{{ widthFinal }}', height: '{{ heightFinal }}' }))
]);
type FadeInOutAnimationParams = { scaleStart: number, scaleFinal: number, opacityStart: number, opacityFinal: number, duration: number };
type ResizeAnimationParams = { widthStart?: number | string, widthFinal?: number | string, heightStart?: number | string, heightFinal?: number | string, duration: number };

export class NGXSeasonModalRef<T = unknown, D = unknown, R = unknown> {

    protected opened$: Subject<ComponentRef<T>> = new AsyncSubject();
    protected closed$: Subject<R | undefined> = new AsyncSubject();

    private resizeChange$: Subject<boolean> = new BehaviorSubject(false);

    private resize$: Subscription = Subscription.EMPTY;
    private beforeStarted$: Subscription = Subscription.EMPTY;
    private started$: Subscription = Subscription.EMPTY;
    private ended$: Subscription = Subscription.EMPTY;

    private readonly width: string | number | undefined = this._config.width;
    private readonly height: string | number | undefined = this._config.height;
    private flag: boolean = false;
    private first: boolean = true;

    constructor(
        protected _builder: AnimationBuilder,
        protected _dragdrop: DragDrop,
        protected _overlayRef: OverlayRef,
        protected _config: NGXSeasonModalConfig,
        protected _data?: D
    ) {
        this.listenModalResizeChange();
        this.listenBackdropClickChange();
        this.listenModalOpenedChange();
        this.listenModalClosedChange();
    }

    opened(): Observable<void> {
        return this.opened$.asObservable().pipe(map(() => {}));
    }

    closed(): Observable<R | undefined> {
        return this.closed$.asObservable();
    }

    resized(): Observable<boolean> {
        return this.resizeChange$.asObservable();
    }

    display(componentRef: ComponentRef<T>): void {
        this.createFadeInOutAnimation(this._overlayRef.overlayElement, 0.5, 1, 0, 1, this._config.animateDuration as number)
            .then(() => {
                this.opened$.next(componentRef);
                this.opened$.complete();
            });
    }

    dismiss(result?: R): void {
        this.createFadeInOutAnimation(this._overlayRef.overlayElement, 1, 0.5, 1, 0, this._config.animateDuration as number)
            .then(() => {
                this.closed$.next(result);
                this.closed$.complete();
            });
    }

    resize(): void {
        this.first = false;
        this.flag = !this.flag;
        this.resizeChange$.next(this.flag);
    }

    isFullScreen(): boolean {
        return this._config.size === 'fs';
    }

    handleModalOutsideClickEvent(): Observable<MouseEvent> {
        return this._overlayRef.outsidePointerEvents();
    }

    handleModalStrikeEvent(): Observable<KeyboardEvent> {
        return this._overlayRef.keydownEvents();
    }

    private drageHandlerEnableDisable(component: NGXSeasonModalContainerComponent, dragRef: DragRef): void {
        const list: HTMLCollection = component.fetchChildNodes();

        for (let i = 0; i < list.length; i++) {
            const element: HTMLElement = list.item(i) as HTMLElement;

            if (element.classList.contains('modal-header')) {
                dragRef.enableHandle(element);
            } else {
                dragRef.disableHandle(element);
            }
        }
    }

    private listenModalResizeChange(): void {
        this.resize$ = this.resizeChange$.asObservable().pipe(debounceTime(100))
            .subscribe(value => {
                if (this.first) return;

                const duration: number = this._config.animateDuration as number;

                if (value) this.createResizeAnimation(this._overlayRef.overlayElement, this.width, '100vw', this.height, '100vh', duration); else this.createResizeAnimation(this._overlayRef.overlayElement, '100vw', this.width, '100vh', this.height, duration);
            });
    }

    private listenDragDropBeforeStartedChange(dragRef: DragRef): void {
        this.beforeStarted$ = dragRef.beforeStarted.asObservable().subscribe(() => this._overlayRef.addPanelClass('before-dragged'));
    }

    private listenDragDropStartedChange(dragRef: DragRef): void {
        this.started$ = dragRef.started.asObservable().subscribe(() => {
            this._overlayRef.removePanelClass('before-dragged');
            this._overlayRef.addPanelClass('after-dragged');
        });
    }

    private listenDragDropEndedChange(dragRef: DragRef): void {
        this.ended$ = dragRef.ended.asObservable().subscribe(() => this._overlayRef.removePanelClass('after-dragged'));
    }

    private listenBackdropClickChange(): void {
        if (this._config.allowBackdropClick) {
            let subscription$: Subscription = this._overlayRef.backdropClick()
                .pipe(debounceTime(100))
                .subscribe(() => {
                    this.dismiss();
                    subscription$.unsubscribe();
                });
        }
    }

    private listenModalOpenedChange(): void {
        let subscription$: Subscription = this.opened$.asObservable().pipe(debounceTime(10))
            .subscribe(componentRef => {
                if (this._config.allowDragDrop && !this.checkFullScreen() && componentRef) {
                    const dragRef = this._dragdrop.createDrag(this._overlayRef.overlayElement);
                    dragRef.dragStartDelay = { touch: this._config.dragDelay as number, mouse: this._config.dragDelay as number };
                    dragRef.withBoundaryElement(this._overlayRef.hostElement);

                    this.drageHandlerEnableDisable(componentRef.instance as NGXSeasonModalContainerComponent, dragRef);

                    this.listenDragDropBeforeStartedChange(dragRef);
                    this.listenDragDropStartedChange(dragRef);
                    this.listenDragDropEndedChange(dragRef);
                }

                subscription$.unsubscribe();
            });
    }

    private listenModalClosedChange(): void {
        let subscription$: Subscription = this.closed()
            .subscribe(() => {
                this._overlayRef.detach();
                this._overlayRef.dispose();

                this.resize$.unsubscribe();
                this.beforeStarted$.unsubscribe();
                this.started$.unsubscribe();
                this.ended$.unsubscribe();

                subscription$.unsubscribe();
            });
    }

    private createFadeInOutAnimation(element: HTMLElement, scaleStart: number, scaleFinal: number, opacityStart: number, opacityFinal: number, duration: number): Promise<void> {
        return new Promise(resolve => {
            const params: FadeInOutAnimationParams = { scaleStart, scaleFinal, opacityStart, opacityFinal, duration };
            const player: AnimationPlayer = this._builder.build(useAnimation(fadeInOutAnimation, { params })).create(element);
            player.onDone(() => {
                element.style.setProperty('scale', `${scaleFinal}`);
                element.style.setProperty('opacity', `${opacityFinal}`);

                player.destroy();

                resolve();
            });
            player.onStart(() => {
                element.style.setProperty('scale', `${scaleStart}`);
                element.style.setProperty('opacity', `${opacityStart}`);
            });
            player.play();
        });
    }

    private createResizeAnimation(element: HTMLElement, widthStart: number | string | undefined, widthFinal: number | string | undefined, heightStart: number | string | undefined, heightFinal: number | string | undefined, duration: number): Promise<void> {
        return new Promise(resolve => {
            const params: ResizeAnimationParams = { widthStart, widthFinal, heightStart, heightFinal, duration };
            const player: AnimationPlayer = this._builder.build(useAnimation(resizeAnimation, { params })).create(element);
            player.onDone(() => {
                this._overlayRef.updateSize({ width: widthFinal, height: heightFinal });

                player.destroy();

                resolve();
            });
            player.onStart(() => this._overlayRef.updateSize({ width: widthStart, height: heightStart }));
            player.play();
        });
    }

    private checkFullScreen(): boolean {
        const hostElement: HTMLElement = this._overlayRef.hostElement, overlayElement: HTMLElement = this._overlayRef.overlayElement;
        return this.isFullScreen() || (hostElement.offsetWidth === overlayElement.offsetWidth && hostElement.offsetHeight === overlayElement.offsetHeight);
    }

}
