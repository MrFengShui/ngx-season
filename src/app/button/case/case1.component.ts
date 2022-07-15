import {ChangeDetectionStrategy, Component} from "@angular/core";

import {OctopusDemoButton} from "../demo/demo.component";

import {OCTOPUS_COLOR_PALETTES} from "../../global/enums.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-demo-button-case1',
    templateUrl: 'case1.component.html'
})
export class OctopusDemoButtonCase1 {

    readonly BASE_STYLE_BUTTONS: OctopusDemoButton[] = Array.from(OCTOPUS_COLOR_PALETTES).map(item =>
        ({color: item, label: `${item} button`}));

}
