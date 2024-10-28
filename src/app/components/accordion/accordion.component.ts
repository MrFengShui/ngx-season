import { CDK_ACCORDION, CdkAccordion } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, OnChanges, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { HmacSHA256, PBKDF2 } from 'crypto-js';

import * as moment from 'moment';

import { NGXSeasonAccordionBlockComponent } from './accordion-block.component';

export type NGXSeasonAccordionColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';

@Component({
    selector: 'ngx-sui-accordion',
    template: `<ng-content select="ngx-sui-accordion-block"></ng-content>`,
    providers: [{ provide: CDK_ACCORDION, useExisting: NGXSeasonAccordionComponent }]
})
export class NGXSeasonAccordionComponent extends CdkAccordion implements OnChanges, AfterViewInit {

    @Input('accordionColor')
    set color(color: NGXSeasonAccordionColor) {
        this._color = color;
    }

    get color(): NGXSeasonAccordionColor {
        return this._color;
    }

    @Input('accordionCtrlIcon')
    set ctrlIcon(ctrlIcon: string) {
        this._ctrlIcon = ctrlIcon;
    }

    get ctrlIcon(): string {
        return this._ctrlIcon;
    }

    @Input('accordionMulti')
    set multiple(multiple: boolean | string) {
        this._multiple = coerceBooleanProperty(multiple);
    }

    get multiple(): boolean {
        return this._multiple;
    }

    private _color: NGXSeasonAccordionColor = 'default';
    private _ctrlIcon: string = 'angle';
    private _multiple: boolean = false;

    @ContentChildren(NGXSeasonAccordionBlockComponent, { read: ElementRef, descendants: false })
    blocks: QueryList<ElementRef<NGXSeasonAccordionBlockComponent>> | undefined;

    color$: Subject<NGXSeasonAccordionColor> = new BehaviorSubject(this.color);
    ctrlIcon$: Subject<string> = new BehaviorSubject(this.ctrlIcon);
    multiple$: Subject<boolean> = new BehaviorSubject(this.multiple);

    override id: string = this.generateAccordionID();

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {
        super();
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('color')) {
            this.changeAccordionColor(changes['color'].currentValue as NGXSeasonAccordionColor);
        }

        if (keys.includes('ctrlIcon')) {
            this.ctrlIcon$.next(changes['ctrlIcon'].currentValue as string);
        }

        if (keys.includes('multiple')) {
            const value = changes['multiple'].currentValue;
            this.multiple$.next(value ? coerceBooleanProperty(value) : false);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'accordion');
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-id', this.id);
        this.changeAccordionColor(this.color);
    }

    override openAll(): void {
        if (this.multiple) this._openCloseAllActions.next(true);
    }

    override closeAll(): void {
        if (this.multiple) this._openCloseAllActions.next(false);
    }

    protected changeAccordionColor(color: NGXSeasonAccordionColor): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-accordion-color', `${color}`);
        this.color$.next(color);
    }

    private generateAccordionID(): string {
        const password: string = `ngx-sui-accordion`;
        const salt: string = `${password}_${moment().format('x')}`;
        const key: string = PBKDF2(password, salt, { keySize: 256, iterations: 1024 }).toString();
        return HmacSHA256(salt, key).toString();
    }

}
