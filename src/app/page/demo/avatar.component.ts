import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";
import { NGXSeasonSizeOption } from "src/app/utils/_size.utils";

@Component({
    selector: 'ngx-sui-demo-avatar-page',
    templateUrl: './avatar.component.html'
})
export class DemoAvatarPageComponent {

    protected srcURL: string = 'assets/test/card-avatar.png';
    protected colors: NGXSeasonColorPalette[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info', 'help'];
    protected sizes: NGXSeasonSizeOption[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'];

}
