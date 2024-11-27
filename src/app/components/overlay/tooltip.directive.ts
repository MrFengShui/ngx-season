import { coerceNumberProperty } from "@angular/cdk/coercion";
import { CloseScrollStrategy, FlexibleConnectedPositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType, TemplatePortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, TemplateRef } from "@angular/core";
import { debounceTime, Subject, Subscription } from "rxjs";

import { NGXSeasonOverlayDirective, NGXSeasonOverlayPosition } from "./overlay.directive";

@Directive({
    selector: '[ngx-sui-Tooltip]',
    exportAs: 'NGXSeasonTooltipDirective'
})
export class NGXSeasonTooltipDirective extends NGXSeasonOverlayDirective implements OnDestroy, AfterViewInit {

    @Input('ttHideDelay')
    set hideDelay(hideDelay: number | string | null) {
        this._hideDelay = hideDelay ? coerceNumberProperty(hideDelay) : 0;
    }

    get hideDelay(): number {
        return this._hideDelay;
    }

    @Input('ttMsg')
    set message(message: string | undefined | null) {
        this._message = message ? message : undefined;
    }

    get message(): string | undefined {
        return this._message;
    }

    @Input('ttShowDelay')
    set showDelay(showDelay: number | string | null) {
        this._showDelay = showDelay ? coerceNumberProperty(showDelay) : 0;
    }

    get showDelay(): number {
        return this._showDelay;
    }

    private _hideDelay: number = 0;
    private _message: string | undefined;
    private _showDelay: number = 0;

    @HostListener('mouseover')
    protected handleHostHoverEvent(): void {
        this.toggled = true;
        this.moveInChange$.next();
    }

    @HostListener('mouseleave')
    protected handleHostLeaveEvent(): void {
        this.toggled = false;
        this.moveOutChange$.next();
    }

    private moveInChange$: Subject<void> = new Subject();
    private moveOutChange$: Subject<void> = new Subject();
    private moveIn$: Subscription = Subscription.EMPTY;
    private moveOut$: Subscription = Subscription.EMPTY;

    private toggled: boolean = false;

    ngOnDestroy(): void {
        this.moveIn$.unsubscribe();
        this.moveOut$.unsubscribe();

        this.moveInChange$.complete();
        this.moveOutChange$.complete();
    }

    ngAfterViewInit(): void {
        this._ngZone.runOutsideAngular(() => {
            this.moveIn$ = this.moveInChange$.asObservable().pipe(debounceTime(this.showDelay))
                .subscribe(() =>
                    this._ngZone.run(() => {
                        if (this.toggled) {
                            if (!this.template && !this.component) this.display(undefined, this._element.nativeElement, this.position);

                            if (this.template) this.display(this.template, this._element.nativeElement, this.position);

                            if (this.component) this.display(this.component, this._element.nativeElement, this.position);

                            if (this.overlayRef) {
                                this.changeOverlayColor(this.color, this.overlayRef.overlayElement);
                                this.listenOverlayOffsetChange(this.positionStrategy as FlexibleConnectedPositionStrategy);
                            }
                        }
                    }));
            this.moveOut$ = this.moveOutChange$.asObservable().pipe(debounceTime(this.hideDelay))
                .subscribe(() =>
                    this._ngZone.run(() => this.dismiss()));
        });
    }

    override display(templateOrComponent: TemplateRef<any> | ComponentType<any> | undefined, element: HTMLElement, position: NGXSeasonOverlayPosition): void {
        if (this.overlayRef?.hasAttached()) return;

        this.positionStrategy = this._overlay.position()
            .flexibleConnectedTo(element)
            .withPositions(this.createOverlayConnectedPosition(position))
            .withFlexibleDimensions(false)
            .withPush(false);
        const scrollStrategy: CloseScrollStrategy = this._overlay.scrollStrategies.close();
        this.overlayRef = this._overlay.create({
            positionStrategy: this.positionStrategy, scrollStrategy, panelClass: ['tooltip'],
            width: 'fit-content', height: 'fit-content'
        });

        if (!templateOrComponent)  {
            const portal = new ComponentPortal(NGXSeasonTooltipMessageComponent);
            const component = this.overlayRef.attach(portal);
            component.setInput('ttMsg', this.message);
        } else if (templateOrComponent instanceof TemplateRef) {
            const portal = new TemplatePortal(templateOrComponent, this._vcr);
            this.overlayRef.attach(portal);
        } else {
            const portal = new ComponentPortal(templateOrComponent);
            this.overlayRef.attach(portal);
        }
    }

    override dismiss(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();

            this.overlayRef = undefined;
        }
    }

}


@Component({
    selector: 'ngx-sui-tooltip-message',
    template: `{{ message }}`
})
export class NGXSeasonTooltipMessageComponent implements AfterViewInit {

    @Input('ttMsg')
    set message(message: string | undefined) {
        this._message = message;
    }

    get message(): string | undefined {
        return this._message;
    }

    private _message: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tooltip-message');
    }

}
