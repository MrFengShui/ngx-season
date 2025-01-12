import { SelectionModel, UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

import { NGX_SEASON_SELECTION_LIST_TOKEN, NGXSeasonSelectionListComponent } from "./list.component";

export type NGXSeasonListFooterAlignment = 'start' | 'center' | 'end';

@Directive({
    selector: 'ng-template[ngx-sui-ListItemTemplate]'
})
export class NGXSeasonListItemTemplateDirective { }

@Directive({
    selector: 'li[ngx-sui-ListItem]'
})
export class NGXSeasonListItemDirective implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-item');
    }

}

@Directive({
    selector: 'li[ngx-sui-ListOption]'
})
export class NGXSeasonListOptionDirective extends NGXSeasonListItemDirective {

    @Input({ alias: 'loValue' })
    set value(value: unknown) {
        this._value = value;
    }

    get value(): unknown {
        return this._value;
    }

    private _value: unknown;

    @HostListener('click')
    protected handleHostClickEvent(): void {
        this._usd.notify(this.id, this._selctionList.id);
    }

    readonly id: string = `ngx-sui-list-option-id-${this._selctionList.optionIndex++}`;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        protected _usd: UniqueSelectionDispatcher,

        @Inject(NGX_SEASON_SELECTION_LIST_TOKEN)
        protected _selctionList: NGXSeasonSelectionListComponent
    ) {
        super(_element, _renderer);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'list-option');
    }

    updateOptionMark(selection: SelectionModel<NGXSeasonListOptionDirective>): void {
        const element = this._element.nativeElement;

        if (selection.isSelected(this)) this._renderer.addClass(element, 'selected');
        else this._renderer.removeClass(element, 'selected');
    }

}

@Directive({
    selector: 'li[ngx-sui-ListDivider]'
})
export class NGXSeasonListDividerDirective extends NGXSeasonListItemDirective {

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-divider');
    }

}

@Directive({
    selector: 'li[ngx-sui-ListSection]'
})
export class NGXSeasonListSectionDirective extends NGXSeasonListItemDirective {

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-section');
    }

}

@Directive({
    selector: 'li[ngx-sui-ListHeader]'
})
export class NGXSeasonListHeaderDirective extends NGXSeasonListItemDirective {

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-header');
    }

}

@Directive({
    selector: 'li[ngx-sui-ListFooter]'
})
export class NGXSeasonListFooterDirective extends NGXSeasonListItemDirective implements OnChanges {

    @Input({ alias: 'lfAlign' })
    set align(align: NGXSeasonListFooterAlignment | undefined | null) {
        this._align = align || 'center';
    }

    get align(): NGXSeasonListFooterAlignment {
        return this._align;
    }

    private _align: NGXSeasonListFooterAlignment = 'center';

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'align') this.changeListFooterAlign(changes[name].currentValue as NGXSeasonListFooterAlignment);
        }
    }

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list-footer');

        this.changeListFooterAlign(this.align);
    }

    protected changeListFooterAlign(align: NGXSeasonListFooterAlignment): void {
        this._renderer.setStyle(this._element.nativeElement, 'justify-content', align);
    }

}
