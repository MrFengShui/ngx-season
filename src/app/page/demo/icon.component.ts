import { Component } from "@angular/core";
import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

@Component({
    selector: 'ngx-sui-demo-icon-page',
    templateUrl: './icon.component.html'
})
export class DemoIconPageComponent {

    protected list: NGXSeasonIconName[] = [
        'accessibility-1', 'accessibility-2', 'add-text', 'administrator', 'airplane', 'alarm-off', 'alarm-on', 'alert', 'align-bottom', 'align-center', 'align-left', 'align-left-text', 'align-middle', 'align-right', 'align-right-text', 'align-top', 'analytics', 'angle-double', 'angle', 'animation', 'application', 'applications', 'archive', 'arrow', 'assign-user', 'asterisk', 'auto', 'avatar', 'axis-chart'
    ];

}