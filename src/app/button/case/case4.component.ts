import {ChangeDetectionStrategy, Component} from "@angular/core";

import {OctopusDemoButton} from "../demo/demo.component";

import {OCTOPUS_COLOR_PALETTES} from "../../global/enums.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-demo-button-case4',
    templateUrl: 'case4.component.html'
})
export class OctopusDemoButtonCase4 {

    readonly BUTTONS: OctopusDemoButton[] = Array.from(OCTOPUS_COLOR_PALETTES).map(item => ({color: item, label: ''}));

}
