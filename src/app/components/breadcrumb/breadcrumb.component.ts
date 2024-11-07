import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2 } from "@angular/core";
import { NGXSeasonIconName } from "../icon/icon.component";

@Component({
    selector: 'ngx-sui-breadcrumb-item',
    template: ''
})
export class NGXSeasonBreadcrumbItem {

    @Input('bcIcon')
    set icon(icon: NGXSeasonIconName | undefined | null) {
        this._icon = icon ? icon : undefined;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('bcLink')
    set link(link: string | undefined) {
        this._link = link;
    }

    get link(): string | undefined {
        return this._link;
    }

    @Input('bcText')
    set text(text: string | undefined) {
        this._text = text;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _icon: NGXSeasonIconName | undefined;
    private _link: string | undefined;
    private _text: string | undefined;

}

@Component({
    selector: 'ngx-sui-breadcrumb',
    template: `
        <ng-container *ngFor="let item of items; last as isLast">
            <ng-container *ngIf="textOnly; then textBlock else linkBlock"></ng-container>
            <ng-template #linkBlock>
                <a [routerLink]="item.link" class="breadcrumb-item link">
                    <ngx-sui-icon [iconShape]="item.icon" *ngIf="item.icon"></ngx-sui-icon>
                    <span class="item-text-wrapper">{{ item.text }}</span>
                </a>
            </ng-template>
            <ng-template #textBlock>
                <span class="breadcrumb-item">
                    <ngx-sui-icon [iconShape]="item.icon" *ngIf="item.icon"></ngx-sui-icon>
                    <span class="item-text-wrapper">{{ item.text }}</span>
                </span>
            </ng-template>
            <ngx-sui-icon iconDegree="90" [iconShape]="splitIcon" *ngIf="!isLast"></ngx-sui-icon>
        </ng-container>
        <ng-template><ng-content select="ngx-sui-breadcrumb-item"></ng-content></ng-template>
    `
})
export class NGXSeasonBreadcrumbComponent implements AfterViewInit {

    @Input('bcSplitIcon')
    set splitIcon(splitIcon: NGXSeasonIconName | null) {
        this._splitIcon = splitIcon ? splitIcon : 'angle';
    }

    get splitIcon(): NGXSeasonIconName {
        return this._splitIcon;
    }

    @Input('bcTextOnly')
    set textOnly(textOnly: boolean | string | null) {
        this._textOnly = coerceBooleanProperty(textOnly);
    }

    get textOnly(): boolean {
        return this._textOnly;
    }

    private _splitIcon: NGXSeasonIconName = 'angle-double';
    private _textOnly: boolean = false;

    @ContentChildren(NGXSeasonBreadcrumbItem)
    protected items: QueryList<NGXSeasonBreadcrumbItem> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'breadcrumb');
    }

}
