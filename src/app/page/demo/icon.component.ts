import { Component } from "@angular/core";
import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

@Component({
    selector: 'ngx-sui-demo-icon-page',
    templateUrl: './icon.component.html'
})
export class DemoIconPageComponent {

    protected list: NGXSeasonIconName[] = [
        'administrator', 'alarm-off', 'alarm-on', 'alert', 'analytics', 'angle', 'angle-double', 'application', 'applications', 'arrow', 'assign-user', 'avatar'
    ];

}