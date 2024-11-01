import { CDK_ACCORDION, CdkAccordion } from '@angular/cdk/accordion';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, NgZone, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { NGXSeasonAccordionPanelComponent } from './accordion-panel.component';

import { NGXSeasonIDUtils } from 'src/app/utils/id.utils';
import { NGXSeasonUniqueSelectionIDDispatcher } from 'src/app/utils/services/switch-select.service';

export type NGXSeasonAccordionColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';

let orderIndex: number = 0;

@Component({
    selector: 'ngx-sui-accordion',
    template: `<ng-content select="ngx-sui-accordion-panel"></ng-content>`,
    providers: [{ provide: CDK_ACCORDION, useExisting: NGXSeasonAccordionComponent }]
})
export class NGXSeasonAccordionComponent extends CdkAccordion implements OnChanges, OnDestroy, AfterViewInit {

    @Input('accdinColor')
    set color(color: NGXSeasonAccordionColor) {
        this._color = color;
    }

    get color(): NGXSeasonAccordionColor {
        return this._color;
    }

    @Input('accdinMultiple')
    set multiple(multiple: boolean | string) {
        this._multiple = coerceBooleanProperty(multiple);
    }

    get multiple(): boolean {
        return this._multiple;
    }

    @Input('accdinShowIcon')
    set showIcon(showIcon: boolean | string) {
        this._showIcon = coerceBooleanProperty(showIcon);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    @Input('accdinShowToggle')
    set showToggle(showToggle: boolean | string) {
        this._showToggle = coerceBooleanProperty(showToggle);
    }

    get showToggle(): boolean {
        return this._showToggle;
    }

    @Input('accdinToggleIcon')
    set toggleIcon(toggleIcon: string | undefined) {
        this._toggleIcon = toggleIcon;
    }

    get toggleIcon(): string | undefined {
        return this._toggleIcon;
    }

    private _color: NGXSeasonAccordionColor = 'default';
    private _multiple: boolean = false;
    private _showIcon: boolean = true;
    private _showToggle: boolean = true;
    private _toggleIcon: string | undefined;

    @ContentChildren(NGXSeasonAccordionPanelComponent)
    panels: QueryList<NGXSeasonAccordionPanelComponent> | undefined;

    toggleIcon$: Subject<string | undefined> = new BehaviorSubject(this.toggleIcon);

    // override readonly id: string = NGXSeasonIDUtils.generateHashID('ngx-sui-accordion');
    override readonly id: string = `ngx-sui-accordion-${orderIndex++}`;

    orderIndex: number = 0;

    private dispatcher$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        protected _dispatcher: NGXSeasonUniqueSelectionIDDispatcher,
    ) {
        super();
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeAccordionColor(changes['color'].currentValue as NGXSeasonAccordionColor);
        }

        if (keys.includes('toggleIcon')) {
            this.toggleIcon$.next(changes['toggleIcon'].currentValue);
        }

        keys.splice(0);
        keys = null;
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.toggleIcon$.complete();
        this.dispatcher$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion');
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-id', this.id);
        this.changeAccordionColor(this.color);
        this.listenDispatcherChange();
    }

    override openAll(): void {
        this.panels?.filter(panel => !panel.toggled).forEach(panel => panel.open());
    }

    override closeAll(): void {
        this.panels?.filter(panel => panel.toggled).forEach(panel => panel.close());
    }

    protected changeAccordionColor(color: NGXSeasonAccordionColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-color', `${color}`);
    }

    private listenDispatcherChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this._dispatcher.listen().subscribe(model => 
                this._ngZone.run(() => {
                    if (model.pid === this.id) {
                        if (!this.multiple) this.closeAll();
                        
                        this.panels?.find(panel => panel.id === model.id)?.open();
                    }
                })));
    }

}
