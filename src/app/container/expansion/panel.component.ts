import { CdkAccordionItem } from "@angular/cdk/accordion";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { Component, ElementRef, HostBinding, ChangeDetectorRef, Renderer2, Input, ViewChild, AfterViewInit } from "@angular/core";

import { CONTENT_COLLAPSE, ICON_ROTATE } from "./expansion.utils";

@Component({
    selector: 'octopus-expansion-panel',
    templateUrl: './panel.component.html',
    animations: [CONTENT_COLLAPSE, ICON_ROTATE]
})
export class OctopusExpansionPanel extends CdkAccordionItem implements AfterViewInit {

    @Input('subject') subject: string = '';
    @Input('description') description: string = '';

    @ViewChild('wrapper', { read: ElementRef, static: true })
    wrapper: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-expansion-panel';

    private index: number;
    private length: number;

    constructor(
        private _cdr: ChangeDetectorRef,
        private _usd: UniqueSelectionDispatcher,
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super(undefined, _cdr, _usd);
    }

    ngAfterViewInit() {
        this.expandedChange.subscribe(value => {
            if (this.index === 0) {
                this._render.setStyle(this.wrapper.nativeElement, 'margin-bottom', value ? '0.5rem' : 0);
            } else if (this.index === this.length - 1) {
                this._render.setStyle(this.wrapper.nativeElement, 'margin-top', value ? '0.5rem' : 0);
            } else {
                this._render.setStyle(this.wrapper.nativeElement, 'margin', value ? '0.5rem 0' : 0);
            }
        });
    }

    size(length: number): void {
        this.length = length;
    }

    select(current: number): void {
        this.expanded = this.index === current;
        this._cdr.detectChanges();
    }

    order(index: number): void {
        this.index = index;
    }

}