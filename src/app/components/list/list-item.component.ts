import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from "@angular/core";

import { NGXSeasonListItemContentDirective, NGXSeasonListItemFooterDirective, NGXSeasonListItemHeaderDirective, NGXSeasonListItemMediaDirective } from "./list-widget.component";
import { NGXSeasonCheckColor, NGXSeasonCheckLabelPosition } from "../check/check.component";
import { NGXSeasonCheckboxCheckedMarkShape, NGXSeasonCheckboxIndeterminatedMarkShape } from "../check/checkbox.component";

@Component({
    selector: 'ngx-sui-list-item',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonListItemComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-item');
    }

}

@Component({
    selector: 'ngx-sui-list-check-item',
    template: `<label ngx-sui-CheckBox [checkColor]="color" [checkChecked]="checked" [checkLabelPos]="position" [cbCheckMark]="checkMark" [cbIndetMark]="indetMark" [checkDisabled]="disabled" (checkCheckedChange)="checkedChange.emit($event)" class="w-100"><ng-content></ng-content></label>`
})
export class NGXSeasonListCheckItemComponent extends NGXSeasonListItemComponent {

    @Input('itemCheckColor')
    set color(color: NGXSeasonCheckColor | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonCheckColor {
        return this._color;
    }

    @Input('itemChecked')
    set checked(checked: boolean | string | null) {
        this._checked = coerceBooleanProperty(checked);
    }

    get checked(): boolean {
        return this._checked;
    }

    @Input('itemCheckMark')
    set checkMark(checkMark: NGXSeasonCheckboxCheckedMarkShape) {
        this._checkMark = checkMark;
    }

    get checkMark(): NGXSeasonCheckboxCheckedMarkShape {
        return this._checkMark;
    }

    @Input('itemCheckDisabled')
    set disabled(disabled: boolean | string | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('itemIndetMark')
    set indetMark(indetMark: NGXSeasonCheckboxIndeterminatedMarkShape) {
        this._indetMark = indetMark;
    }

    get indetMark(): NGXSeasonCheckboxIndeterminatedMarkShape {
        return this._indetMark;
    }

    @Input('itemLabelPos')
    set position(position: NGXSeasonCheckLabelPosition | null) {
        this._position = position ? position : 'before';
    }

    get position(): NGXSeasonCheckLabelPosition {
        return this._position;
    }

    private _color: NGXSeasonCheckColor = 'default';
    private _checked: boolean = false;
    private _checkMark: NGXSeasonCheckboxCheckedMarkShape = 'tick';
    private _disabled: boolean = false;
    private _indetMark: NGXSeasonCheckboxIndeterminatedMarkShape = 'dash';
    private _position: NGXSeasonCheckLabelPosition = 'before';

    @Output('itemCheckedChange')
    checkedChange: EventEmitter<boolean> = new EventEmitter(true);

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'list-check-item');
    }

}

@Component({
    selector: 'ngx-sui-list-meta-item',
    template: `
        <div class="list-item-main-wrapper" *ngIf="headerTemplate || contentTemplate || footerTemplate">
            <div class="list-item-header" *ngIf="headerTemplate"><ng-template [cdkPortalOutlet]="headerPortal"></ng-template></div>
            <div class="list-item-content" *ngIf="contentTemplate"><ng-template [cdkPortalOutlet]="contentPortal"></ng-template></div>
            <div class="list-item-footer" *ngIf="footerTemplate"><ng-template [cdkPortalOutlet]="footerPortal"></ng-template></div>
        </div>
        <div class="list-item-media-wrapper" *ngIf="mediaTemplate"><ng-template [cdkPortalOutlet]="mediaPortal"></ng-template></div>
        <ng-template>
            <ng-content select="[ngx-sui-ListItemHeader]"></ng-content>
            <ng-content select="[ngx-sui-ListItemContent]"></ng-content>
            <ng-content select="[ngx-sui-ListItemFooter]"></ng-content>
            <ng-content select="[ngx-sui-ListItemMedia]"></ng-content>
        </ng-template>
    `
})
export class NGXSeasonListMetaItemComponent extends NGXSeasonListItemComponent implements AfterContentInit {

    @ContentChild(NGXSeasonListItemHeaderDirective)
    protected headerTemplate: NGXSeasonListItemHeaderDirective | undefined;

    @ContentChild(NGXSeasonListItemContentDirective)
    protected contentTemplate: NGXSeasonListItemContentDirective | undefined;

    @ContentChild(NGXSeasonListItemFooterDirective)
    protected footerTemplate: NGXSeasonListItemFooterDirective | undefined;

    @ContentChild(NGXSeasonListItemMediaDirective)
    protected mediaTemplate: NGXSeasonListItemMediaDirective | undefined;

    protected headerPortal: TemplatePortal | undefined;
    protected contentPortal: TemplatePortal | undefined;
    protected footerPortal: TemplatePortal | undefined;
    protected mediaPortal: TemplatePortal | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {
        super(_element, _renderer);
    }

    ngAfterContentInit(): void {
        if (this.headerTemplate) this.headerPortal = new TemplatePortal(this.headerTemplate?.fetchTemplate(), this._vcr);

        if (this.contentTemplate) this.contentPortal = new TemplatePortal(this.contentTemplate?.fetchTemplate(), this._vcr);

        if (this.footerTemplate) this.footerPortal = new TemplatePortal(this.footerTemplate?.fetchTemplate(), this._vcr);

        if (this.mediaTemplate) this.mediaPortal = new TemplatePortal(this.mediaTemplate?.fetchTemplate(), this._vcr);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        
        this._renderer.addClass(this._element.nativeElement, 'list-meta-item');
    }

}