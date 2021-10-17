import { Direction } from "@angular/cdk/bidi";
import { SelectionModel } from "@angular/cdk/collections";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";

import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusAvatar } from "../avatar/avatar.component";

export class OctopusSelectListChange {

    items: OctopusSelectListItem[] = [];
    source!: OctopusSelectList;

}

@Component({
    selector: 'span[octopus-list-item-title]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemTitle {

    @HostBinding('class') class: string = 'octopus-list-item-title';

}

@Component({
    selector: 'span[octopus-list-item-subtitle]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemSubtitle {

    @HostBinding('class') class: string = 'octopus-list-item-subtitle';

}

@Component({
    selector: 'span[octopus-list-item-content]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemContent {

    @HostBinding('class') class: string = 'octopus-list-item-content';

}

@Component({
    selector: 'span[octopus-list-item-duration]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemDuration {

    @HostBinding('class') class: string = 'octopus-list-item-duration';

}

@Component({
    selector: 'div[octopus-list-item-media]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemMedia {

    @HostBinding('class') class: string = 'octopus-list-item-media';

}

@Component({
    selector: 'div[octopus-list-item-addon]',
    template: `<ng-content></ng-content>`
})
export class OctopusListItemAddon {

    @HostBinding('class') class: string = 'octopus-list-item-addon';

}

@Component({
    selector: `span[octopus-list-headline],
        h1[octopus-list-headline],h2[octopus-list-headline],h3[octopus-list-headline],
        h4[octopus-list-headline],h5[octopus-list-headline],h6[octopus-list-headline]`,
    template: `<ng-content></ng-content>`
})
export class OctopusListHeadline {

    @HostBinding('class') class: string = 'octopus-list-headline';

}

@Component({
    selector: 'octopus-list-item',
    template: `
        <div class="octopus-list-item-wrapper">
            <div class="octopus-list-item-meta" *ngIf="check()">
                <ng-content select="img[octopus-avatar]" *ngIf="avatars.length === 1"></ng-content>
                <ng-content select="span[octopus-list-item-title]" *ngIf="titles.length === 1"></ng-content>
                <ng-content select="span[octopus-list-item-subtitle]" *ngIf="subtitles.length === 1"></ng-content>
                <ng-content select="span[octopus-list-item-duration]" *ngIf="durations.length === 1"></ng-content>
                <ng-content select="span[octopus-list-item-content]" *ngIf="contents.length === 1"></ng-content>
                <ng-content select="div[octopus-list-item-addon]" *ngIf="addons.length === 1"></ng-content>
                <ng-content select="div[octopus-list-item-media]" *ngIf="medias.length === 1"></ng-content>
            </div>
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusListItem implements AfterContentInit {

    @ContentChildren(OctopusAvatar) avatars!: QueryList<OctopusAvatar>;
    @ContentChildren(OctopusListItemTitle) titles!: QueryList<OctopusListItemTitle>;
    @ContentChildren(OctopusListItemSubtitle) subtitles!: QueryList<OctopusListItemSubtitle>;
    @ContentChildren(OctopusListItemDuration) durations!: QueryList<OctopusListItemDuration>;
    @ContentChildren(OctopusListItemContent) contents!: QueryList<OctopusListItemContent>;
    @ContentChildren(OctopusListItemAddon) addons!: QueryList<OctopusListItemAddon>;
    @ContentChildren(OctopusListItemMedia) medias!: QueryList<OctopusListItemMedia>;

    @HostBinding('class') class: string = 'octopus-list-item';

    ngAfterContentInit() {
        if (this.avatars.length > 1) {

        }
    }

    check(): boolean {
        return this.avatars.length === 1 || this.titles.length === 1 || this.subtitles.length === 1 || this.durations.length === 1
            || this.contents.length === 1 || this.addons.length === 1 || this.medias.length === 1;
    }

}

@Component({
    selector: 'a[octopus-nav-list-item]',
    template: `
        <div style="position: absolute;inset: 0;"><div octopus-ripple class="h-100"></div></div>
        <div class="octopus-list-item-meta" *ngIf="check()">
            <ng-content select="img[octopus-avatar]" *ngIf="avatars.length === 1"></ng-content>
            <ng-content select="span[octopus-list-item-title]" *ngIf="titles.length === 1"></ng-content>
            <ng-content select="span[octopus-list-item-subtitle]" *ngIf="subtitles.length === 1"></ng-content>
            <ng-content select="span[octopus-list-item-duration]" *ngIf="durations.length === 1"></ng-content>
            <ng-content select="span[octopus-list-item-content]" *ngIf="contents.length === 1"></ng-content>
            <ng-content select="div[octopus-list-item-addon]" *ngIf="addons.length === 1"></ng-content>
            <ng-content select="div[octopus-list-item-media]" *ngIf="medias.length === 1"></ng-content>
        </div>
        <span class="octopus-list-item-text">{{text}}</span>
        <ng-content select="octopus-icon"></ng-content>
        <ng-content></ng-content>
    `
})
export class OctopusNavListItem extends OctopusListItem implements OnInit {

    @Input('itemText') text: string | undefined = '';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngOnInit() {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-nav-list-item'));
    }

}

@Component({
    selector: 'octopus-select-list-item',
    template: `
        <div class="octopus-select-list-item-wrapper" octopus-ripple>
            <octopus-checkbox [color]="color" [checked]="formatBoolean(selected)"></octopus-checkbox>
            <div class="content">
                <div class="octopus-list-item-meta" *ngIf="check()">
                    <ng-content select="img[octopus-avatar]" *ngIf="avatars.length === 1"></ng-content>
                    <ng-content select="span[octopus-list-item-title]" *ngIf="titles.length === 1"></ng-content>
                    <ng-content select="span[octopus-list-item-subtitle]" *ngIf="subtitles.length === 1"></ng-content>
                    <ng-content select="span[octopus-list-item-duration]" *ngIf="durations.length === 1"></ng-content>
                    <ng-content select="span[octopus-list-item-content]" *ngIf="contents.length === 1"></ng-content>
                    <ng-content select="div[octopus-list-item-addon]" *ngIf="addons.length === 1"></ng-content>
                    <ng-content select="div[octopus-list-item-media]" *ngIf="medias.length === 1"></ng-content>
                </div>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class OctopusSelectListItem extends OctopusListItem implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('direction') direction: Direction = 'ltr';
    @Input('selected') selected: boolean | string = false;

    @Output('selectedChange') selectedChange: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click')
    private listenHostClick(): void {
        this.toggle();
    }

    private subscription!: Subscription;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusSelectList))
        private _list: OctopusSelectList
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.direction !== undefined) {
            setTimeout(() => this.renderDirection(changes.direction.previousValue, changes.direction.currentValue));
        }

        if (changes.selected !== undefined) {
            this.selectedChange.emit(coerceBooleanProperty(changes.selected.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.selectedChange.emit(coerceBooleanProperty(this.selected));
            this._render.addClass(this._ref.nativeElement, 'octopus-select-list-item');
            this.renderDirection(undefined, this.direction);
        });
    }

    ngAfterViewInit() {
        this.subscription = this.selectedChange.asObservable().subscribe(value => {
            if (!coerceBooleanProperty(this._list.multiple)) {
                this._list.items.filter(item => item !== this).forEach(item => item.selected = false);
            }

            this.updateSelection(value);

            let change: OctopusSelectListChange = new OctopusSelectListChange();
            change.items = this._list.selection.selected;
            change.source = this._list;
            this._list.selectChange.emit(change);
        });
    }

    ngOnDestroy() {
        this.selectedChange.complete();

        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    formatBoolean(flag: boolean | string): boolean {
        return coerceBooleanProperty(flag);
    }

    toggle(): void {
        this.renderSelect(coerceBooleanProperty(this.selected));
    }

    private updateSelection(selected: boolean): void {
        let selectList: OctopusSelectListItem[] = [];
        let deselectList: OctopusSelectListItem[] = [];

        if (selected) {
            selectList = this._list.items.filter(item => coerceBooleanProperty(item.selected));
        } else {
            deselectList = this._list.items.filter(item => !coerceBooleanProperty(item.selected));
        }

        this._list.selection.select(...selectList);
        this._list.selection.deselect(...deselectList);
    }

    private renderDirection(prevDir: Direction | undefined, currDir: Direction): void {
        this._render.removeClass(this._ref.nativeElement, prevDir === undefined ? 'rtl' : prevDir);
        this._render.addClass(this._ref.nativeElement, currDir);
    }

    private renderSelect(selected: boolean): void {
        this.selected = !selected;
        this.selectedChange.emit(this.selected);
    }

}

@Component({
    selector: 'octopus-list',
    template: `
        <div class="octopus-list-wrapper">
            <ng-content select="octopus-list-item,[octopus-list-headline],[octopus-divider],ng-container"></ng-content>
        </div>
    `
})
export class OctopusList implements OnChanges, OnInit {

    @Input('ordered') ordered: boolean | string = false;

    @HostBinding('class') class: string = 'octopus-list';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ordered !== undefined) {
            setTimeout(() => this.renderOrder(coerceBooleanProperty(changes.ordered.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderOrder(coerceBooleanProperty(this.ordered)));
    }

    private renderOrder(ordered: boolean): void {
        if (ordered) {
            this._render.addClass(this._ref.nativeElement, 'octopus-list-number');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'octopus-list-number');
        }
    }

}

@Component({
    selector: 'octopus-nav-list',
    template: `
        <div class="octopus-nav-list-wrapper">
            <ng-content select="a[octopus-nav-list-item],[octopus-list-headline],[octopus-divider]"></ng-content>
        </div>
    `
})
export class OctopusNavList {

    @HostBinding('class') class: string = 'octopus-nav-list';

}

@Component({
    selector: 'octopus-select-list',
    template: `
        <div class="octopus-select-list-wrapper">
            <ng-content select="octopus-select-list-item,div[octopus-divider]"></ng-content>
        </div>
    `
})
export class OctopusSelectList extends OctopusList implements OnChanges, OnInit, OnDestroy {

    @Input('color') color: ColorPalette = 'base';
    @Input('multiple') multiple: boolean | string = true;

    @Output('change') selectChange: EventEmitter<OctopusSelectListChange> = new EventEmitter();

    @ContentChildren(OctopusSelectListItem) items!: QueryList<OctopusSelectListItem>;

    @HostBinding('class') class: string = 'octopus-select-list';

    selection: SelectionModel<OctopusSelectListItem> = new SelectionModel<OctopusSelectListItem>(coerceBooleanProperty(this.multiple), []);

    private subscription!: Subscription;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.color !== undefined) {
            setTimeout(() => this.items.forEach(item => item.color = changes.color.currentValue));
        }

        if (changes.multiple !== undefined) {
            this.selection = new SelectionModel(coerceBooleanProperty(changes.multiple.currentValue), this.selection.selected);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => this.items.forEach(item => item.color = this.color));
    }

    ngOnDestroy() {
        this.selectChange.complete();

        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    selectAll(): void {
        this.items.forEach(item => item.selected = true);
    }

    deselectAll(): void {
        this.items.forEach(item => item.selected = false);
    }

}


