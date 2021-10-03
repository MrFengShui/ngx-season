import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'octopus-detail-unit',
    template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class OctopusDetailUnit {

    @ViewChild(TemplateRef) content!: TemplateRef<any>;

    @Input('label') label: string = '';

    @Input('span')
    get span(): any { return this._span; }
    set span(_span: any) { this._span = coerceNumberProperty(_span); }
    private _span: any = 1;

}

@Component({
    selector: 'octopus-detail',
    template: `
        <table class="octopus-detail-wrapper text-base" align="center" border="0" cellspacing="5%" width="100%" #wrapper>
            <tbody>
                <tr *ngFor="let units of unitsList">
                    <ng-container *ngFor="let unit of units">
                        <th>{{unit.label}}</th>
                        <td [attr.colspan]="unit.span">
                            <ng-container [ngTemplateOutlet]="unit.content"></ng-container>
                        </td>
                    </ng-container>
                </tr>
            </tbody>
        </table>
        <ng-template><ng-content select="octopus-detail-unit"></ng-content></ng-template>
    `
})
export class OctopusDetail implements OnChanges, OnInit, AfterContentInit {

    @Input('bordered')
    get bordered(): any { return this._bordered; }
    set bordered(_bordered: any) { this._bordered = coerceBooleanProperty(_bordered); }
    private _bordered: any = true;

    @Input('color') color: ColorPalette = 'base';

    @Input('columns')
    get columns(): any { return this._columns; }
    set columns(_columns: any) { this._columns = coerceNumberProperty(_columns); }
    private _columns: any = 6;

    @ContentChildren(OctopusDetailUnit)
    private units!: QueryList<OctopusDetailUnit>;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-detail';

    unitsList: Array<OctopusDetailUnit[]> = new Array();

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.bordered) {
            setTimeout(() => this.renderBorder(changes.bordered.currentValue));
        }

        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderBorder(this.bordered);
            this.renderColor(undefined, this.color);
        });
    }

    ngAfterContentInit() {
        let count: number = 0;
        let list: OctopusDetailUnit[] = [];
        this.units.forEach((unit, index) => {
            count += unit.span + 1;
            list.push(unit);

            if (count + this.units.get(index)?.span + 1 > this.columns) {
                this.unitsList.push(list);
                list = [];
                count = 0;
            }
        });
    }

    private renderBorder(bordered: boolean): void {
        if (bordered) {
            this._render.removeClass(this.wrapper.nativeElement, 'no-border');
        } else {
            this._render.addClass(this.wrapper.nativeElement, 'no-border');
        }
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-detail' : `octopus-${prevColor}-detail`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-detail`);
    }

}