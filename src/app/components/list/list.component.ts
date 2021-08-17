import { SelectionModel } from "@angular/cdk/collections";
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { BOOLEAN_ADAPTOR } from "src/app/global/boolean.utils";
import { OctopusSelectListChange } from "./list.utils";

import { OctopusSelectListItem } from "./item.component";

@Component({
    selector: 'octopus-list',
    template: `
        <div class="octopus-list-wrapper">
            <ng-content select="octopus-list-item,[octopus-list-headline],[octopus-divider]"></ng-content>
        </div>
    `
})
export class OctopusList implements OnChanges, OnInit {

    @Input('ordered') ordered: boolean = false;

    @HostBinding('class') class: string = 'octopus-list';

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ordered !== undefined) {
            setTimeout(() => this.build(changes.ordered.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.build(this.ordered));
    }

    private build(ordered: boolean | string): void {
        if (BOOLEAN_ADAPTOR(ordered)) {
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
            <ng-content select="octopus-select-list-item,[octopus-divider]"></ng-content>
        </div>
    `
})
export class OctopusSelectList extends OctopusList implements OnChanges, OnInit, OnDestroy, AfterContentInit {

    @Input('color') color: string;
    @Input('multiple') multiple: boolean = true;

    @Output('change') selectChange: EventEmitter<OctopusSelectListChange> = new EventEmitter();

    @ContentChildren(OctopusSelectListItem) items: QueryList<OctopusSelectListItem>;

    @HostBinding('class') class: string = 'octopus-select-list';

    selection: SelectionModel<OctopusSelectListItem> = new SelectionModel(this.multiple, []);

    private subscription: Subscription;

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.color !== undefined) {
            this.buildColor(changes.color.currentValue);
        }

        if (changes.multiple !== undefined) {
            this.selection = new SelectionModel(BOOLEAN_ADAPTOR(changes.multiple.currentValue), this.selection.selected);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.buildColor(this.color);
    }

    ngAfterContentInit() {
        this.items.forEach(item => this.subscription = item.change().subscribe(() => {
            if (!this.multiple) {
                this.items.filter(element => element !== item).forEach(element => element.selected = false);
            }

            let selected: OctopusSelectListItem[] = this.items.filter(item => item.selected);
            let deselected: OctopusSelectListItem[] = this.items.filter(item => !item.selected);
            this.update(selected, deselected);

            let change: OctopusSelectListChange = new OctopusSelectListChange();
            change.items = this.selection.selected;
            change.source = this;
            this.selectChange.emit(change);
        }));
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

    private update(selected: OctopusSelectListItem[], deselected: OctopusSelectListItem[]): void {
        this.selection.select(...selected);
        this.selection.deselect(...deselected);
    }

    private buildColor(color: string | undefined): void {
        if (color !== undefined) {
            setTimeout(() => this.items.forEach(item => item.color = color));
        }
    }

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
