import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, InjectionToken, Input, NgZone, OnChanges, OnDestroy, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";
import { Subscription } from 'rxjs';

import { NGXSeasonColorPalette } from 'src/app/utils/palette.utils';

import { NGXSeasonAccordionSelectionService } from './accordion.service';

import { NGXSeasonAccordionPanelComponent } from './accordion-panel.component';

export const NGX_SEASON_ACCORDION_TOKEN: InjectionToken<NGXSeasonAccordionComponent> = new InjectionToken('NGX_SEASON_ACCORDION_TOKEN');

let accordionIndex: number = 0;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-accordion',
    template: `<ng-content select="ngx-sui-accordion-panel"></ng-content>`,
    providers: [{ provide: NGX_SEASON_ACCORDION_TOKEN, useExisting: NGXSeasonAccordionComponent }]
})
export class NGXSeasonAccordionComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input({ alias: 'accdColor' })
    set color(color: NGXSeasonColorPalette) {
        this._color = color;
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'accdDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'accdDuration' })
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'accdMulti' })
    set multiple(multiple: boolean | string) {
        this._multiple = coerceBooleanProperty(multiple);
    }

    get multiple(): boolean {
        return this._multiple;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _duration: number = 250;
    private _multiple: boolean = true;

    @ContentChildren(NGXSeasonAccordionPanelComponent)
    panels: QueryList<NGXSeasonAccordionPanelComponent> | undefined;

    readonly id: string = `ngx-sui-accordion-id-${accordionIndex++}`;

    panelIndex: number = 0;

    private model$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _service: NGXSeasonAccordionSelectionService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeAccordionColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'duration') this.setupAccordionDuration(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.model$.unsubscribe();
    }

    ngAfterContentInit(): void {
        if (this.multiple) {
            this.panels?.forEach(panel => panel.toggle(panel.toggled));
        } else {
            let flag: boolean = false, panel: NGXSeasonAccordionPanelComponent | undefined;

            for (let length = coerceNumberProperty(this.panels?.length), i = length - 1; i >= 0; i--) {
                panel = this.panels?.get(i);

                if (!flag && panel?.toggled) {
                    panel.toggle(true);
                    flag = true;
                } else {
                    panel?.toggle(false);
                }
            }
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion');

        this.changeAccordionColor(this.color);
        this.setupAccordionDuration(this.duration);
        this.listenAccordioonPanelSelectedChange();
    }

    openAll(): void {
        if (this.multiple && this.panels) this.panels.forEach(panel => panel.open());
    }

    closeAll(): void {
        if (this.multiple && this.panels) this.panels.forEach(panel => panel.close());
    }

    protected changeAccordionColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-color', color);
    }

    protected setupAccordionDuration(duration: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--accordion-panel-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    private listenAccordioonPanelSelectedChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.model$ = this._service.listen(100).subscribe(model => {
                if (model.pid === this.id && this.panels) {
                    if (this.multiple) {
                        const panel = this.panels.find(panel => panel.id === model.id);
                        panel?.toggle(model.toggled);
                    } else {
                        this.panels.forEach(panel => panel.toggle(false));
                        this.panels.find(panel => panel.id === model.id)?.toggle(true);
                    }
                }
            }));
    }

}
