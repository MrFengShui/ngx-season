import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-field-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFieldViewComponent {

    required: boolean = true;
    visible: boolean = true;

}