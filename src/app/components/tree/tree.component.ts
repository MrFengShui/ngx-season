import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, OnChanges, Output, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";
import { Subscription } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

import { NGXSeasonTreeDataSource, NGXSeasonTreeNodeModel } from "./tree.utils";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export const NGX_SEASON_TREE_TOKEN: InjectionToken<NGXSeasonTreeComponent> = new InjectionToken('NGX_SEASON_TREE_TOKEN');

export type NGXSeasonTreeControlStyle = 'flat' | 'outline' | 'solid';
export type NGXSeasonTreeSelectionModel<T = any> = { source: HTMLElement, value: T };

@Component({
    selector: 'ngx-sui-tree',
    template: `<ngx-sui-tree-node [nodeHideCtrl]="value.children?.length === 0" [nodeModel]="value" *ngFor="let value of values"></ngx-sui-tree-node>`,
    providers: [{ provide: NGX_SEASON_TREE_TOKEN, useExisting: NGXSeasonTreeComponent }]
})
export class NGXSeasonTreeComponent implements OnChanges, AfterViewInit {

    @Input('treeColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('treeCtrlStyle')
    set ctrlStyle(ctrlStyle: NGXSeasonTreeControlStyle | undefined | null) {
        this._ctrlStyle = ctrlStyle || 'solid';
    }

    get ctrlStyle(): NGXSeasonTreeControlStyle {
        return this._ctrlStyle;
    }

    @Input('treeDuration')
    set duration(duration: number | string | undefined | null) {
        this._duration = duration ? coerceNumberProperty(duration) : 250;
    }

    get duration(): number {
        return this._duration;
    }

    @Input('treeCollapseIcon')
    set collapseIcon(collapseIcon: NGXSeasonIconName | undefined | null) {
        this._collapseIcon = collapseIcon || 'minus';
    }

    get collapseIcon(): NGXSeasonIconName {
        return this._collapseIcon;
    }

    @Input('treeExpandIcon')
    set expandIcon(expandIcon: NGXSeasonIconName | undefined | null) {
        this._expandIcon = expandIcon || 'plus';
    }

    get expandIcon(): NGXSeasonIconName {
        return this._expandIcon;
    }

    @Input('treeDataSrc')
    set source(source: NGXSeasonTreeDataSource<unknown> | undefined | null) {
        this._source = source || undefined;
    }

    get source(): NGXSeasonTreeDataSource<unknown> | undefined {
        return this._source;
    }

    @Input('treeOffset')
    set offset(offset: number | string | undefined | null) {
        this._offset = coerceNumberProperty(offset);
    }

    get offset(): number {
        return this._offset;
    }

    @Input('treeShowCheck')
    set showCheck(showCheck: boolean | string | undefined | null) {
        this._showCheck = coerceBooleanProperty(showCheck);
    }

    get showCheck(): boolean {
        return this._showCheck;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _ctrlStyle: NGXSeasonTreeControlStyle = 'solid';
    private _duration: number = 250;
    private _expandIcon: NGXSeasonIconName = 'plus';
    private _collapseIcon: NGXSeasonIconName = 'minus';
    private _source: NGXSeasonTreeDataSource<unknown> | undefined;
    private _offset: number = 16;
    private _showCheck: boolean = false;

    @Output('treeSelectionChange')
    selectionChange: EventEmitter<NGXSeasonTreeSelectionModel<unknown>> = new EventEmitter(true);

    protected values: Array<NGXSeasonTreeNodeModel<unknown>> | undefined;

    private source$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'duration') this.changeTreeNodeAnimationDuration(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tree');

        this.changeTreeNodeAnimationDuration(this.duration);
        this.listenDataSourceChange(this.source);
    }

    protected changeTreeNodeAnimationDuration(duration: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--tree-node-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    private listenDataSourceChange(source: NGXSeasonTreeDataSource<unknown> | undefined): void {
        this._ngZone.runOutsideAngular(() => {
            if (source) this.source$ = source.connect().subscribe({
                next: values => this.values = values,
                complete: () => this.source$.unsubscribe()
            });
        });
    }

}

@Component({
    selector: 'ngx-sui-tree-node',
    template: `
        <a class="node-control" (click)="handleNodeControlEvent($event, model?.data)">
            <button ngx-sui-IconButton [btnColor]="_tree.color" [btnIcon]="toggled ? (collapseIcon || _tree.collapseIcon) : (expandIcon || _tree.expandIcon)" btnCircled="true" btnSize="md" btnStyle="flat" [style.visibility]="hasChildren(model?.children) ? 'visible' : 'hidden'" (click)="handleNodeToggleEvent($event)" *ngIf="_tree.ctrlStyle === 'flat'"></button>
            <button ngx-sui-IconButton [btnColor]="_tree.color" [btnIcon]="toggled ? (collapseIcon || _tree.collapseIcon) : (expandIcon || _tree.expandIcon)" btnCircled="true" btnSize="sm" btnStyle="flat" [style.visibility]="hasChildren(model?.children) ? 'visible' : 'hidden'" (click)="handleNodeToggleEvent($event)" *ngIf="_tree.ctrlStyle === 'outline'"></button>
            <button ngx-sui-IconButton [btnColor]="_tree.color" [btnIcon]="toggled ? (collapseIcon || _tree.collapseIcon) : (expandIcon || _tree.expandIcon)" btnCircled="true" btnSize="sm" btnStyle="flat" [style.visibility]="hasChildren(model?.children) ? 'visible' : 'hidden'" (click)="handleNodeToggleEvent($event)" *ngIf="_tree.ctrlStyle === 'solid'"></button>
            <label ngx-sui-CheckBox [(checkChecked)]="checked" [cbIndeterminated]="indeterminated" [checkColor]="_tree.color" checkShowLabel="false" (checkCheckedChange)="listenTreeNodeCheckedChange($event)" *ngIf="_tree.showCheck"></label>
            <span class="node-text">{{ model?.label }}</span>
        </a>
        <div class="node-content" [class.hidden]="!toggled" [style.padding-left]="offset + 'px'" #content *ngIf="model && model.children && model.children.length > 0">
            <ngx-sui-tree-node [nodeParent]="fetchSelf()" [nodeHideCtrl]="model.children.length === 0" [nodeModel]="child" #node *ngFor="let child of model.children"></ngx-sui-tree-node>
        </div>
    `
})
export class NGXSeasonTreeNodeComponent implements AfterViewInit {

    @Input('nodeCollapseIcon')
    set collapseIcon(collapseIcon: NGXSeasonIconName | undefined | null) {
        this._collapseIcon = collapseIcon || undefined;
    }

    get collapseIcon(): NGXSeasonIconName | undefined {
        return this._collapseIcon;
    }

    @Input('nodeExpandIcon')
    set expandIcon(expandIcon: NGXSeasonIconName | undefined | null) {
        this._expandIcon = expandIcon || undefined;
    }

    get expandIcon(): NGXSeasonIconName | undefined {
        return this._expandIcon;
    }

    // @Input('nodeChecked')
    // set checked(checked: boolean | string | undefined | null) {
    //     this._checked = coerceBooleanProperty(checked);
    // }

    // get checked(): boolean {
    //     return this._checked;
    // }

    // @Input('nodeIndeterminated')
    // set indeterminated(indeterminated: boolean | string | undefined | null) {
    //     this._indeterminated = coerceBooleanProperty(indeterminated);
    // }

    // get indeterminated(): boolean {
    //     return this._indeterminated;
    // }

    @Input('nodeHideCtrl')
    set hideCtrl(hideCtrl: boolean | string | undefined | null) {
        this._hideCtrl = coerceBooleanProperty(hideCtrl);
    }

    get hideCtrl(): boolean {
        return this._hideCtrl;
    }

    @Input('nodeModel')
    set model(model: NGXSeasonTreeNodeModel<unknown> | undefined | null) {
        this._model = model || undefined;
    }

    get model(): NGXSeasonTreeNodeModel<unknown> | undefined {
        return this._model;
    }

    // @Input('nodeParentModel')
    // set parentModel(parentModel: NGXSeasonTreeNodeModel<unknown> | undefined | null) {
    //     this._parentModel = parentModel || undefined;
    // }

    // get parentModel(): NGXSeasonTreeNodeModel<unknown> | undefined {
    //     return this._parentModel;
    // }

    @Input('nodeParent')
    set parent(parent: NGXSeasonTreeNodeComponent | undefined | null) {
        this._parent = parent || undefined;
    }

    get parent(): NGXSeasonTreeNodeComponent | undefined {
        return this._parent;
    }

    @Input('nodeOffset')
    set offset(offset: number | string | undefined | null) {
        this._offset = coerceNumberProperty(offset);
    }

    get offset(): number {
        return this._offset;
    }

    @Input('nodeToggled')
    set toggled(toggled: boolean | string | undefined | null) {
        this._toggled = coerceBooleanProperty(toggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    private _collapseIcon: NGXSeasonIconName | undefined;
    private _expandIcon: NGXSeasonIconName | undefined;
    // private _checked: boolean = false;
    // private _indeterminated: boolean = false;
    private _hideCtrl: boolean = false;
    private _model: NGXSeasonTreeNodeModel<unknown> | undefined;
    // private _parentModel: NGXSeasonTreeNodeModel<unknown> | undefined;
    private _parent: NGXSeasonTreeNodeComponent | undefined;
    private _offset: number = 16;
    private _toggled: boolean = false;

    @ViewChild('content', { read: ElementRef, static: false })
    protected content: ElementRef<HTMLElement> | undefined;

    @ViewChildren('node')
    protected nodes: QueryList<NGXSeasonTreeNodeComponent> | undefined;

    checked: boolean = false;
    indeterminated: boolean = false;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_TREE_TOKEN)
        protected _tree: NGXSeasonTreeComponent
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tree-node');
    }

    expand(): void {
        this.toggled = true;
    }

    collapse(): void {
        this.toggled = false;
    }

    protected toggle(): void {
        this.toggled = !this.toggled;
    }

    protected fetchSelf(): NGXSeasonTreeNodeComponent {
        return this;
    }

    protected hasChildren(children: NGXSeasonTreeNodeModel[] | undefined): boolean {
        return children !== undefined && children.length > 0;
    }

    protected handleNodeToggleEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.toggle();
    }

    protected handleNodeControlEvent(event: MouseEvent, data: unknown): void {
        this._tree.selectionChange.emit({ source: (event.currentTarget || event.target) as HTMLElement, value: data });
    }

    protected listenTreeNodeCheckedChange(checked: boolean): void {
        this.checkAllDescendants(this, checked);
        this.checkAllAncestors(this);
    }

    private checkAllAncestors(node: NGXSeasonTreeNodeComponent): void {
        let parent: NGXSeasonTreeNodeComponent | undefined = node.parent, nodes: QueryList<NGXSeasonTreeNodeComponent> | undefined, checkedLength: number, indeterminatedLength: number;

        while (parent) {
            nodes = parent.nodes;

            if (nodes) {
                checkedLength = nodes.filter(node => node.checked).length;
                indeterminatedLength = nodes.filter(node => node.indeterminated).length;

                parent.indeterminated = (checkedLength > 0 && checkedLength < nodes.length) || indeterminatedLength > 0;
                parent.checked = checkedLength === nodes.length;
            }

            parent = parent.parent;
        }

        nodes = undefined;
        parent = undefined;
    }

    private checkAllDescendants(node: NGXSeasonTreeNodeComponent, checked: boolean): void {
        let list: NGXSeasonTreeNodeComponent[] | undefined = [], item: NGXSeasonTreeNodeComponent | undefined;

        list.push(node);

        while (list.length > 0) {
            item = list.pop();

            if (item) {
                item.checked = checked;
                item.indeterminated = false;

                if (item.nodes) list.push(...item.nodes);
            }
        }

        list = undefined;
        item = undefined;
    }

}
