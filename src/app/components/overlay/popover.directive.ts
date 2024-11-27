import { ComponentPortal, ComponentType, TemplatePortal } from "@angular/cdk/portal";
import { CloseScrollStrategy, FlexibleConnectedPositionStrategy, OverlayRef } from "@angular/cdk/overlay";
import { Directive, HostListener, Input, OnInit, TemplateRef } from "@angular/core";
import { debounceTime, map, Subscription } from "rxjs";

import { NGXSeasonOverlayDirective, NGXSeasonOverlayPosition } from "./overlay.directive";

@Directive({
    selector: '[ngx-sui-Popover]',
    exportAs: 'NGXSeasonPopoverDirective'
})
export class NGXSeasonPopoverDirective extends NGXSeasonOverlayDirective {

    private readonly ID_KEY: string = 'data-popover-id';
    private readonly ID_VALUE: string = 'ngx-sui-popover';

    private outsidePointer$: Subscription = Subscription.EMPTY;

    @HostListener('click', ['$event'])
    protected listenHostClickEvent(event: MouseEvent): void {
        const element: HTMLElement = (event.currentTarget || event.target) as HTMLElement;

        if (element.hasAttribute(this.ID_KEY)) {
            this.dismiss();
        } else {
            if (this.template) this.display(this.template, this._element.nativeElement, this.position);

            if (this.component) this.display(this.component, this._element.nativeElement, this.position);

            if (this.overlayRef) {
                this._renderer.setAttribute(this._element.nativeElement, this.ID_KEY, this.ID_VALUE);

                this.changeOverlayColor(this.color, this.overlayRef.overlayElement);
                this.listenOverlayOffsetChange(this.positionStrategy as FlexibleConnectedPositionStrategy);
                this.listenOverlayOutsidePointerEventsChange(this.overlayRef);
            }
        }
    }

    override display(templateOrComponent: TemplateRef<any> | ComponentType<any> | undefined, element: HTMLElement, position: NGXSeasonOverlayPosition): void {
        if (!templateOrComponent) throw new Error();

        this.positionStrategy = this._overlay.position()
            .flexibleConnectedTo(element)
            .withPositions(this.createOverlayConnectedPosition(position))
            .withFlexibleDimensions(false)
            .withPush(false);
        const scrollStrategy: CloseScrollStrategy = this._overlay.scrollStrategies.close();
        this.overlayRef = this._overlay.create({
            positionStrategy: this.positionStrategy, scrollStrategy, panelClass: ['popover'],
            width: 'fit-content', height: 'fit-content'
        });
        const portal = templateOrComponent instanceof TemplateRef
            ? new TemplatePortal(templateOrComponent, this._vcr)
            : new ComponentPortal(templateOrComponent)
        this.overlayRef.attach(portal);
    }

    override dismiss(): void {
        if (this.overlayRef) {
            this._renderer.removeAttribute(this._element.nativeElement, this.ID_KEY);

            this.outsidePointer$.unsubscribe();

            this.overlayRef.detach();
            this.overlayRef.dispose();

            this.overlayRef = undefined;
        }
    }

    private listenOverlayOutsidePointerEventsChange(overlayRef: OverlayRef): void {
        this._ngZone.runOutsideAngular(() =>
            this.outsidePointer$ = overlayRef.outsidePointerEvents().pipe(debounceTime(10))
                .subscribe(event =>
                    this._ngZone.run(() => {
                        const element: HTMLElement = (event.currentTarget || event.target) as HTMLElement;

                        if (!element.hasAttribute(this.ID_KEY)) this.dismiss();
                    })));
    }

}
