import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { timer } from "rxjs";
import { Subscription } from "rxjs";

import { LanguageUnitModel } from "src/app/models/service/local.model";

import { HomeLanguageService } from "src/app/services/home.service";
import { StorageUtils } from "src/app/utils/storage.utils";

@Component({
    selector: 'app-home-setting-language',
    templateUrl: './language.component.html'
})
export class HomeSettingLanguageComponent implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class: string = 'language';

    utils!: StorageUtils;

    select!: string | null;

    list!: LanguageUnitModel[];

    listSub!: Subscription;
    timerSub!: Subscription;

    constructor(private service: HomeLanguageService) { }

    ngOnInit() {
        this.utils = StorageUtils.newInstance();
        this.select = this.utils.getLanguage();
    }

    ngAfterViewInit() {
        this.listSub = this.service.fetch().subscribe(value => this.list = value, error => console.error(error), () => this.listSub.unsubscribe());
    }

    ngOnDestroy() {
        if (this.listSub !== undefined && !this.listSub.closed) {
            this.listSub.unsubscribe();
        }

        if (this.timerSub !== undefined && !this.timerSub.closed) {
            this.timerSub.unsubscribe();
        }
    }

    listenLanguageChange(change: MatRadioChange): void {
        this.utils.setLanguage(change.value);
    }

}