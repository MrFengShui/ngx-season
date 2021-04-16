import { Component, HostBinding, Input } from "@angular/core";
import { UnitAnchorModel } from "src/app/models/widget/block.model";

@Component({
    selector: 'app-widgets-media-recommend',
    templateUrl: './recommend.component.html'
})
export class WidgetsMediaRecommendComponent {

    @Input('list') list: UnitAnchorModel[] = [];

    @HostBinding('class') class: string = 'recommend';

    // model: UnitAnchorModel = new UnitAnchorModel('', 'Subject', ['tests/image/img-8k-1.jpg'], 'assets/images/profile.png', 'Channel Name', 0, new Date(), 1);

}