import { Component } from "@angular/core";

import { NGXSeasonInputColor } from "src/app/components/input/input.component";

@Component({
    selector: 'ngx-sui-demo-input-page',
    templateUrl: './input.component.html'
})
export class DemoInputPageComponent {

    protected colors: NGXSeasonInputColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected text: string = '';

}