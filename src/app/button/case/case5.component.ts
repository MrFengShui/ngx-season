import {ChangeDetectionStrategy, Component} from "@angular/core";

import {OctopusDemoButton} from "../demo/demo.component";

import {OCTOPUS_COLOR_PALETTES} from "../../global/enums.utils";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-demo-button-case5',
    templateUrl: 'case5.component.html'
})
export class OctopusDemoButtonCase5 {}
