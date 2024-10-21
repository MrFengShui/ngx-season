import { Component } from "@angular/core";

import { NGXSeasonAvatarColor, NGXSeasonAvatarSize } from "src/app/components/avatar.component";

@Component({
    selector: 'ngx-sui-demo-avatar-page',
    templateUrl: './avatar.component.html'
})
export class DemoAvatarPageComponent {

    protected srcURL: string = 'https://cdn3.iconfinder.com/data/icons/iconka-buddy-set/128/alien_128.png';
    protected colors: NGXSeasonAvatarColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected sizes: NGXSeasonAvatarSize[] = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

}