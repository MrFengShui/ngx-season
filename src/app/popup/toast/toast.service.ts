import { OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusPopup } from "../popup.service";

import { OctopusAlertToastQueue, OctopusNoticeToastQueue } from "./toast.component";

export class OctopusAlertToastData {

    color: ColorPalette;
    content: string;
    noClose: boolean;

    constructor(_color: ColorPalette, _content: string, _noClose: boolean) {
        this.color = _color;
        this.content = _content;
        this.noClose = _noClose;
    }

}

export class OctopusNoticeToastData {

    color: ColorPalette;
    description: string;
    noClose: boolean;
    subject: string;

    constructor(_color: ColorPalette, _description: string, _noClose: boolean, _subject: string) {
        this.color = _color;
        this.description = _description;
        this.noClose = _noClose;
        this.subject = _subject;
    }

}

@Injectable()
export class OctopusToast {

    private alertRef: OverlayRef | undefined;
    private noticeRef: OverlayRef | undefined;
    private alertQueue: OctopusAlertToastQueue | undefined;
    private noticeQueue: OctopusNoticeToastQueue | undefined;

    constructor(private _popup: OctopusPopup) { }

    showAlert(duration: number = 5000): void {
        if (this.alertRef === undefined) {
            this.alertRef = this._popup.create({
                positionStrategy: this._popup.globalPosition('top center'),
                scrollStrategy: this._popup.selectScroll('block'),
                width: '75%'
            });
            this.alertQueue = this.alertRef.attach(new ComponentPortal(OctopusAlertToastQueue)).instance;
            this.alertQueue.duration = duration;
            this.alertRef.updatePosition();
            let subscription: Subscription = this.alertQueue.list$.asObservable().subscribe(value => {
                if (value) {
                    this.hideAlert();
                    subscription.unsubscribe();
                }
            });
        }
    }

    pushAlert(data: OctopusAlertToastData): void {
        this.alertQueue?.push(data);
    }

    hideAlert(): void {
        if (this.alertRef !== undefined && this.alertRef.hasAttached()) {
            this.alertRef.detach();
            this.alertRef.dispose();
            this.alertRef = undefined;
        }
    }

    showNotice(duration: number = 5000): void {
        if (this.noticeRef === undefined) {
            this.noticeRef = this._popup.create({
                positionStrategy: this._popup.globalPosition('top right'),
                scrollStrategy: this._popup.selectScroll('block'),
                width: 'auto'
            });
            this.noticeQueue = this.noticeRef.attach(new ComponentPortal(OctopusNoticeToastQueue)).instance;
            this.noticeQueue.duration = duration;
            this.noticeRef.updatePosition();
            let subscription: Subscription = this.noticeQueue.list$.asObservable().subscribe(value => {
                if (value) {
                    this.hideNotice();
                    subscription.unsubscribe();
                }
            });
        }
    }

    pushNotice(data: OctopusNoticeToastData): void {
        this.noticeQueue?.push(data);
    }

    hideNotice(): void {
        if (this.noticeRef !== undefined && this.noticeRef.hasAttached()) {
            this.noticeRef.detach();
            this.noticeRef.dispose();
            this.noticeRef = undefined;
        }
    }

}