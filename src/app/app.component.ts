import { ApplicationRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { CHART_LIST, COMPONENT_LIST, CONTAINER_LIST, DemoRouterLinkModel, FORM_LIST, LAYOUT_LIST, POPUP_LIST } from './demo/demo.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    @ViewChild('border', { read: ElementRef, static: true })
    private border!: ElementRef<HTMLElement>;

    @ViewChild('north', { read: ElementRef, static: true })
    private north!: ElementRef<HTMLElement>;

    chartList!: DemoRouterLinkModel[];
    componentList!: DemoRouterLinkModel[];
    containerList!: DemoRouterLinkModel[];
    formList!: DemoRouterLinkModel[];
    layoutList!: DemoRouterLinkModel[];
    popupList!: DemoRouterLinkModel[];

    constructor(
        private _ref: ApplicationRef,
        private _zone: NgZone
    ) {
        this._zone.runOutsideAngular(() =>
            setInterval(() => this._zone.run(() => this._ref.tick()), 250));
    }

    ngOnInit() {
        this.chartList = CHART_LIST;
        this.componentList = COMPONENT_LIST;
        this.containerList = CONTAINER_LIST;
        this.formList = FORM_LIST;
        this.layoutList = LAYOUT_LIST;
        this.popupList = POPUP_LIST;
    }

    calcSize(): string {
        return `calc(${this.border.nativeElement.children[0].clientHeight}px - ${this.north.nativeElement.clientHeight}px)`;
    }

}
