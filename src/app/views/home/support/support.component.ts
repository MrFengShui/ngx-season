import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LanguageEntity, ThemeEntity } from "src/app/models/avatar.model";
import { HomeLanguageService, HomeThemeService } from "src/app/services/home.service";

@Component({
    selector: 'app-home-support',
    templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit, OnDestroy {

    themeList!: ThemeEntity[];
    langList!: LanguageEntity[];

    themeSub!: Subscription;
    langSub!: Subscription;

    constructor(
        private themeService: HomeThemeService,
        private langService: HomeLanguageService
    ) { }

    ngOnInit() {
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

}