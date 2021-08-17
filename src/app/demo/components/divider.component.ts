import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-divider-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDividerViewComponent { }