import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-avatar-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoAvatarViewComponent { }