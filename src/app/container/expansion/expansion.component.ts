import { CdkAccordion } from "@angular/cdk/accordion";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusExpansionPanel } from "./panel.component";

@Component({
    selector: 'octopus-expansion',
    template: `
        <div cdkAccordion class="octopus-expansion-wrapper">
            <ng-content select="octopus-expansion-panel"></ng-content>
        </div>
    `
})
export class OctopusExpansion extends CdkAccordion implements OnChanges, OnInit, AfterViewInit, AfterContentInit {

    @Input('color') color: ColorPalette = 'primary';
    @Input('index') index: number = -1;

    @ContentChildren(OctopusExpansionPanel) panels: QueryList<OctopusExpansionPanel>;

    @HostBinding('class') class: string = 'octopus-expansion';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.build(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.index !== undefined) {
            setTimeout(() => this.panels.forEach(panel => panel.select(coerceNumberProperty(changes.index.currentValue))));
        }

        if (changes.multi !== undefined) {
            setTimeout(() => this.matchPanel(coerceBooleanProperty(changes.multi.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.build(undefined, this.color));
    }

    ngAfterViewInit() {
        this.panels.forEach(panel => panel.select(coerceNumberProperty(this.index)));
        this.matchPanel(this.multi);
    }

    ngAfterContentInit() {
        this.panels.forEach((panel, index) => {
            panel.order(index);
            panel.size(this.panels.length);
        });
    }

    private matchPanel(multi: boolean): void {
        if (multi) {
            this._openCloseAllActions.asObservable().subscribe(value =>
                this.panels.forEach(panel => panel.expanded = value));
        } else {
            this.panels.forEach(panel =>
                panel.expandedChange.asObservable().subscribe(value => {
                    this.panels.filter(item => item !== panel).forEach(item => item.expanded = false);
                    panel.expanded = value;
                }));
        }
    }

    private build(prevColor: ColorPalette, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? `octopus-primary-expansion` : `octopus-${prevColor}-expansion`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-expansion`);
    }

}
