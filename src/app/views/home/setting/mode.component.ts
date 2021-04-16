import { Component, HostBinding, OnInit, Renderer2 } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";

import { StorageUtils } from "src/app/utils/storage.utils";

@Component({
    selector: 'app-home-setting-mode',
    templateUrl: './mode.component.html'
})
export class HomeSettingModeComponent implements OnInit {

    @HostBinding('class') class: string = 'mode';

    utils!: StorageUtils;

    select!: string | null;

    constructor(private render: Renderer2) { }

    ngOnInit() {
        this.utils = StorageUtils.newInstance();
        this.select = this.utils.getMode();
    }

    listenModeChange(change: MatRadioChange): void {
        this.utils.setMode(change.value);
        this.render.setAttribute(document.documentElement, 'class', 'theme ' + this.utils.getTheme() + '-' + change.value);
    }

}