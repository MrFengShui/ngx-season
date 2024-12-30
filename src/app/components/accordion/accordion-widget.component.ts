import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2 } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

@Component({
    selector: 'ngx-sui-base-accordion-panel',
    template: ''
})
export abstract class NGXSeasonBaseAccordionPanelComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    fetchHostElement(): HTMLElement {
        return this._element.nativeElement;
    }

}

@Component({
    selector: 'ngx-sui-accordion-panel-header',
    template: `
        <ng-container *ngIf="custom; then customTemplate else nativeTemplate"></ng-container>
        <ng-template #nativeTemplate>
            <div class="label">{{ label }}</div>
            <ngx-sui-icon [iconShape]="(toggled$.asObservable() | async) ? expandIcon : collapseIcon" iconSolid *ngIf="showToggleIcon"></ngx-sui-icon>
        </ng-template>
        <ng-template #customTemplate><ng-content></ng-content></ng-template>
    `
})
export class NGXSeasonAccordionPanelHeaderComponent extends NGXSeasonBaseAccordionPanelComponent implements OnDestroy, AfterViewInit {

    @Input({ alias: 'aphCustom' })
    set custom(custom: boolean | string | undefined | null) {
        this._custom = coerceBooleanProperty(custom);
    }

    get custom(): boolean {
        return this._custom;
    }

    @Input({ alias: 'aphCollapseIcon' })
    set collapseIcon(collapseIcon: NGXSeasonIconName | undefined | null) {
        this._collapseIcon = collapseIcon || 'resize-up';
    }

    get collapseIcon(): NGXSeasonIconName {
        return this._collapseIcon;
    }

    @Input({ alias: 'aphExpandIcon' })
    set expandIcon(expandIcon: NGXSeasonIconName | undefined | null) {
        this._expandIcon = expandIcon || 'resize-down';
    }

    get expandIcon(): NGXSeasonIconName {
        return this._expandIcon;
    }

    @Input({ alias: 'aphLabel', required: true })
    set label(label: string | undefined | null) {
        this._label = label || undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    @Input({ alias: 'aphShowToggleIcon' })
    set showToggleIcon(showToggleIcon: boolean | string | undefined | null) {
        this._showToggleIcon = coerceBooleanProperty(showToggleIcon);
    }

    get showToggleIcon(): boolean {
        return this._showToggleIcon;
    }

    private _custom: boolean = false;
    private _collapseIcon: NGXSeasonIconName = 'resize-up';
    private _expandIcon: NGXSeasonIconName = 'resize-down';
    private _label: string | undefined;
    private _showToggleIcon: boolean = true;

    toggled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    ngOnDestroy(): void {
        this.toggled$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'panel-header');
    }

}

@Component({
    selector: 'ngx-sui-accordion-panel-content',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonAccordionPanelContentComponent extends NGXSeasonBaseAccordionPanelComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'panel-content');
    }

}

@Component({
    selector: 'ngx-sui-accordion-panel-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonAccordionPanelFooterComponent extends NGXSeasonBaseAccordionPanelComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'panel-footer');
    }

}

