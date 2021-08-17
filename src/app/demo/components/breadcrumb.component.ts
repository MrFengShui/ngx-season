import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-breadcrumb-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './breadcrumb.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBreadcrumbViewComponent { }