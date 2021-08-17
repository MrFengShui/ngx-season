import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-card-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCardViewComponent { }