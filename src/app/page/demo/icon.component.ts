import { Component } from "@angular/core";
import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

@Component({
    selector: 'ngx-sui-demo-icon-page',
    templateUrl: './icon.component.html'
})
export class DemoIconPageComponent {

    protected list: NGXSeasonIconName[] = [
        'accessibility-1', 'accessibility-2', 'add-text', 'administrator', 'airplane', 'alarm-off', 'alarm-on', 'alert', 'align-bottom', 'align-center', 'align-left', 'align-left-text', 'align-middle', 'align-right', 'align-right-text', 'align-top', 'analytics', 'angle-double', 'angle', 'animation', 'application', 'applications', 'archive', 'arrow', 'assign-user', 'asterisk', 'auto', 'avatar', 'axis-chart',
        'backup', 'backup-restore', 'balance', 'ban', 'bank', 'bar-chart', 'bar-code', 'bars', 'battery', 'bell', 'bell-curve', 'beta', 'bicycle', 'bitcoin', 'block', 'blocks-group', 'bluetooth-off', 'bluetooth-on', 'boat', 'bold', 'bolt', 'book', 'bookmark', 'box-plot', 'briefcase', 'bubble-exclamation', 'bug', 'building', 'bullet-list', 'bullseye', 'bundle', 
    ];

}