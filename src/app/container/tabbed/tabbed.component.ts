import { TemplatePortal } from "@angular/cdk/portal";
import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

import { Alignment, ColorPalette } from "src/app/global/enum.utils";
import { CONTENT_SELECT } from "./tabbed.utils";

@Component({
    selector: 'octopus-tabbed-unit',
    template: `<ng-template><ng-content></ng-content></ng-template>`
})
export class OctopusTabbedUnit implements OnInit {

    @Input('icon') icon: string = '';
    @Input('text') text: string = '';

    @ViewChild(TemplateRef, { static: true })
    private template: TemplateRef<any>;

    contentPortal: TemplatePortal<any>;

    constructor(private _vcr: ViewContainerRef) { }

    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.template, this._vcr);
    }

}

@Component({
    selector: 'octopus-tabbed',
    templateUrl: './tabbed.component.html',
    animations: [CONTENT_SELECT]
})
export class OctopusTabbed implements OnChanges, OnInit, AfterViewInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('position') position: Alignment = 'start';
    @Input('select') select: number = 0;

    @ContentChildren(OctopusTabbedUnit, { descendants: true })
    units: QueryList<OctopusTabbedUnit>;

    @ViewChild('content', { read: ElementRef, static: true })
    private content: ElementRef<HTMLElement>;

    @ViewChildren('tab', { read: ElementRef, emitDistinctChangesOnly: true })
    private tabs: QueryList<ElementRef<HTMLElement>>;

    @HostBinding('class') class: string = 'octopus-tabbed';

    hidden$: Subject<boolean> = new Subject();

    constructor(
        private _cdr: ChangeDetectorRef,
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    ngAfterViewInit() {
        let sourceWidth: number = this.content.nativeElement.clientWidth;
        let targetWidth: number = 0;
        this.tabs.forEach(tab => targetWidth += tab.nativeElement.clientWidth);
        this.hidden$.next(targetWidth <= sourceWidth);
        this._cdr.detectChanges();
    }

    handleScrollActionEvent(element: HTMLElement, flag: number): void {
        if (flag === -1) {
            let value: number = element.scrollLeft - 240;

            if (value < 0) {
                element.scrollTo({ left: 0 });
            } else {
                element.scrollTo({ left: value });
            }
        }

        if (flag === 1) {
            let value: number = element.scrollLeft + 240;

            if (value > element.scrollWidth) {
                element.scrollTo({ left: element.scrollWidth - element.clientWidth });
            } else {
                element.scrollTo({ left: value });
            }
        }
    }

    private renderColor(prevColor: ColorPalette, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-tabbed' : `octopus-${prevColor}-tabbed`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-tabbed`);
    }

}
