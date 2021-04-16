import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-home-setting',
    templateUrl: './setting.component.html'
})
export class HomeSettingComponent implements OnInit, OnDestroy {

    @HostBinding('class') class: string = 'setting';

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}