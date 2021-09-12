import { Component, OnInit } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";
import { OctopusAlertToastQueue } from "src/app/popup/toast/toast.component";

import { OctopusToast } from "src/app/popup/toast/toast.service";

@Component({
    selector: 'app-demo-toast-view',
    templateUrl: './toast.component.html'
})
export class DemoToastView implements OnInit {

    constructor(private _toast: OctopusToast) { }

    ngOnInit() {

    }

    handleAlertActionEvent(flag: ColorPalette): void {
        this._toast.showAlert();
        this._toast.pushAlert({
            color: flag,
            noClose: false,
            content: `This is a ${flag} alert toast.`
        });
    }

    handleNoticeActionEvent(flag: ColorPalette): void {
        this._toast.showNotice();
        this._toast.pushNotice({
            color: flag,
            noClose: false,
            subject: `${flag.toUpperCase()} Notification Toast Subject`,
            description: `This is a ${flag} description toast.`
        });
    }

}