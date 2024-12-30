import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-input-page',
    templateUrl: './input.component.html'
})
export class DemoInputPageComponent {

    protected colors: NGXSeasonColorPalette[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected text: string = '';

}
