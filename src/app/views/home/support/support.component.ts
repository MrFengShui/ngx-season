import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LanguageEntity, ThemeEntity } from "src/app/models/avatar.model";
import { HomeLanguageService, HomeThemeService } from "src/app/services/home.service";

@Component({
    selector: 'app-home-support',
    templateUrl: './support.component.html'
})
export class HomeSupportComponent implements OnInit, OnDestroy {

    @HostBinding('class') class: string = 'support';

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}