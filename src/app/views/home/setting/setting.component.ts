import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Subscription } from "rxjs";
import { LanguageEntity, ThemeEntity } from "src/app/models/avatar.model";
import { HomeLanguageService, HomeThemeService } from "src/app/services/home.service";

@Component({
    selector: 'app-home-setting',
    templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit, OnDestroy {

    multiple!: boolean;
    expanded!: boolean;
    expandFlag!: number;

    themeList!: ThemeEntity[];
    langList!: LanguageEntity[];

    themeSub!: Subscription;
    langSub!: Subscription;

    constructor(
        private themeService: HomeThemeService,
        private langService: HomeLanguageService
    ) { }

    ngOnInit() {
        this.multiple = false;
        this.expanded = false;
        this.expandFlag = 0;
        this.themeSub = this.themeService.getTheme('assets/data/theme.data.json').subscribe(list => this.themeList = list);
        this.langSub = this.langService.getLanguage('assets/data/language.data.json').subscribe(list => this.langList = list);
    }

    ngOnDestroy() {
        if (this.themeSub !== undefined) {
            this.themeSub.unsubscribe();
        }

        if (this.langSub !== undefined) {
            this.langSub.unsubscribe();
        }
    }

    listenMultipleChange(change: MatCheckboxChange): void {
        if (!change.checked) {
            this.expandFlag = 0;
        }
    }

}