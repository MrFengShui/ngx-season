import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, OnChanges, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonIconName } from "../icon/icon.component";

export type NGXSeasonBreadcrumbMark = 'arrow' | 'chevron' | 'circle' | 'point' | 'rabbet' | 'rhombus';

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
        <ng-container *ngFor="let item of items; index as idx; last as isLast">
            <ng-container *ngIf="textOnly; then textBlock else linkBlock"></ng-container>
            <ng-template #linkBlock>
                <a [routerLink]="item.link" (mouseover)="flags[idx] = true" (mouseleave)="flags[idx] = false" class="breadcrumb-item link">
                    <ngx-sui-icon [iconShape]="item.icon" [iconSolid]="flags[idx]" iconSize="lg" *ngIf="item.icon"></ngx-sui-icon>
                    <span class="item-text-wrapper">{{ item.text }}</span>
                </a>
            </ng-template>
            <ng-template #textBlock>
                <span class="breadcrumb-item">
                    <ngx-sui-icon [iconShape]="item.icon" iconSolid="true" iconSize="lg" *ngIf="item.icon"></ngx-sui-icon>
                    <span class="item-text-wrapper">{{ item.text }}</span>
                </span>
            </ng-template>
            <span class="split-mark" *ngIf="!isLast"></span>
        </ng-container>
        <ng-template><ng-content select="ngx-sui-breadcrumb-item"></ng-content></ng-template>
    `
})
export class NGXSeasonBreadcrumbComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('bcSplitIcon')
    set mark(mark: NGXSeasonBreadcrumbMark | null) {
        this._mark = mark ? mark : 'chevron';
    }

    get mark(): NGXSeasonBreadcrumbMark {
        return this._mark;
    }

    @Input('bcTextOnly')
    set textOnly(textOnly: boolean | string | null) {
        this._textOnly = coerceBooleanProperty(textOnly);
    }

    get textOnly(): boolean {
        return this._textOnly;
    }

    private _mark: NGXSeasonBreadcrumbMark = 'chevron';
    private _textOnly: boolean = false;

    @ContentChildren(NGXSeasonBreadcrumbItem)
    protected items: QueryList<NGXSeasonBreadcrumbItem> | undefined;

    protected flags: boolean[] = [];

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'mark') this.changeBreadcrumbSplitMark(changes[name].currentValue as NGXSeasonBreadcrumbMark);
        }
    }

    ngAfterContentInit(): void {
        if (this.items) this.flags = this.items.map(() => false);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'breadcrumb');

        this.changeBreadcrumbSplitMark(this.mark);
    }

    protected changeBreadcrumbSplitMark(mark: NGXSeasonBreadcrumbMark): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-breadcrumb-split-mark', mark);
    }

}
