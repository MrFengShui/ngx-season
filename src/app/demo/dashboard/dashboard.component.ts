import { Component, OnInit } from "@angular/core";

import { DemoRouterLinkModel, CHART_LIST, COMPONENT_LIST, CONTAINER_LIST, FORM_LIST, LAYOUT_LIST, POPUP_LIST } from "../demo.utils";

@Component({
    selector: 'app-demo-dashboard-view',
    styleUrls: ['../demo.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DemoDashboardView implements OnInit {

    chartList!: DemoRouterLinkModel[];
    componentList!: DemoRouterLinkModel[];
    containerList!: DemoRouterLinkModel[];
    formList!: DemoRouterLinkModel[];
    layoutList!: DemoRouterLinkModel[];
    popupList!: DemoRouterLinkModel[];

    ngOnInit() {
        this.chartList = CHART_LIST;
        this.componentList = COMPONENT_LIST;
        this.containerList = CONTAINER_LIST;
        this.formList = FORM_LIST;
        this.layoutList = LAYOUT_LIST;
        this.popupList = POPUP_LIST;
    }

}