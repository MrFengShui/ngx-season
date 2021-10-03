import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

class DemoBreadcrumbModel {

    color?: ColorPalette;
    text?: string[];

}

@Component({
    selector: 'app-demo-breadcrumb-view',
    templateUrl: './breadcrumb.component.html'
})
export class DemoBreadcrumbView {

    list: DemoBreadcrumbModel[] = [
        { color: 'primary', text: ['Primary Breadcrumb Anchor I', 'Primary Breadcrumb Anchor II', 'Primary Breadcrumb Anchor III'] },
        { color: 'secondary', text: ['Secondary Breadcrumb Anchor I', 'Secondary Breadcrumb Anchor II', 'Secondary Breadcrumb Anchor III'] },
        { color: 'success', text: ['Success Breadcrumb Anchor I', 'Success Breadcrumb Anchor II', 'Success Breadcrumb Anchor III'] },
        { color: 'warning', text: ['Warning Breadcrumb Anchor I', 'Warning Breadcrumb Anchor II', 'Warning Breadcrumb Anchor III'] },
        { color: 'failure', text: ['Failure Breadcrumb Anchor I', 'Failure Breadcrumb Anchor II', 'Failure Breadcrumb Anchor III'] },
        { color: 'info', text: ['Info Breadcrumb Anchor I', 'Info Breadcrumb Anchor II', 'Info Breadcrumb Anchor III'] }
    ];

}