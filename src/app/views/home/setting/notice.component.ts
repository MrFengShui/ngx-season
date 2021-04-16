import { Component, HostBinding, OnInit } from "@angular/core";
import { SettingNoticeModel, SettingNoticeUnitModel } from "src/app/models/view/setting.model";

@Component({
    selector: 'app-home-setting-notice',
    templateUrl: './notice.component.html'
})
export class HomeSettingNoticeComponent implements OnInit {

    @HostBinding('class') class: string = 'notice';

    model!: SettingNoticeModel;

    ngOnInit() {
        this.model = new SettingNoticeModel(
            new SettingNoticeUnitModel(false, false, false, false),
            new SettingNoticeUnitModel(false, false, false, false)
        );
    }

}