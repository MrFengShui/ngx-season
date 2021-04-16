import { Component, HostBinding, OnInit, Renderer2 } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { Subscription, timer } from "rxjs";

import { ThemeUnitModel } from "src/app/models/service/local.model";

import { HomeThemeService } from "src/app/services/home.service";

import { StorageUtils } from "src/app/utils/storage.utils";

@Component({
    selector: 'app-home-setting-theme',
    templateUrl: './theme.component.html'
})
export class HomeSettingThemeComponent implements OnInit {

    @HostBinding('class') class: string = 'theme';

    utils!: StorageUtils;

    select!: string | null;

    list!: ThemeUnitModel[];

    listSub!: Subscription;
    timerSub!: Subscription;

    constructor(
        private render: Renderer2,
        private service: HomeThemeService
    ) { }

    ngOnInit() {
        this.utils = StorageUtils.newInstance();
        this.select = this.utils.getTheme();
        this.list = new Array(6);
    }

    ngAfterViewInit() {
        this.listSub = this.service.fetch().subscribe(list => this.list = list, error => console.error(error), () => this.listSub.unsubscribe());
    }

    ngOnDestroy() {
        if (this.listSub !== undefined && !this.listSub.closed) {
            this.listSub.unsubscribe();
        }

        if (this.timerSub !== undefined && !this.timerSub.closed) {
            this.timerSub.unsubscribe();
        }
    }

    listenThemeChange(change: MatRadioChange): void {
        this.utils.setTheme(change.value);
        this.render.setAttribute(document.documentElement, 'class', 'theme ' + change.value + '-' + this.utils.getMode());
    }

}