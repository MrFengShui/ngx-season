import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-button-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoButtonViewComponent { }