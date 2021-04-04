import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatRadioChange } from "@angular/material/radio";
import { Subscription } from "rxjs";

import { LanguageEntity, ModeEntity, ThemeEntity } from "src/app/models/avatar.model";
import { RouterLinkEntity } from "src/app/models/sidenav.model";

import { HomeLanguageService, HomeModeService, HomeSidenavService, HomeThemeService } from "src/app/services/home.service";

import { SigninComponent } from "../../overlay/signin/signin.component";

@Component({
    selector: 'app-widgets-avatar',
    templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit, OnDestroy, AfterViewInit {

    logged!: boolean;
    modeSelectCode!: string;
    themeSelectCode!: string;
    langSelectCode!: string;
    modeSelectText!: string;
    themeSelectText!: string;
    langSelectText!: string;

    modeList!: ModeEntity[];
    themeList!: ThemeEntity[];
    langList!: LanguageEntity[];
    libList!: RouterLinkEntity[];
    preferList!: RouterLinkEntity[];

    modeSub!: Subscription;
    themeSub!: Subscription;
    langSub!: Subscription;
    libSub!: Subscription;
    preferSub!: Subscription;
    dialogSub!: Subscription;

    constructor(
        private dialog: MatDialog,
        private render: Renderer2,
        private navService: HomeSidenavService,
        private modeService: HomeModeService,
        private themeService: HomeThemeService,
        private langService: HomeLanguageService
    ) { }

    ngOnInit() {
        const metadata = window.localStorage.getItem('ap_meta');
        this.logged = metadata !== null && metadata !== undefined;
        this.modeSelectCode = 'dark';
        this.themeSelectCode = 'indigo';
        this.langSelectCode = 'en_US';
    }

    ngAfterViewInit() {
        this.libSub = this.navService.getNavlink('assets/data/navlink.data.json').subscribe(list => {
            this.libList = list[2].list || [];
            this.preferList = list[6].list || [];
        });
        this.modeSub = this.modeService.getMode('assets/data/mode.data.json').subscribe(list => {
            this.modeList = list;
            this.modeSelectText = this.modeList.filter(value => value.mode === this.modeSelectCode)[0].text;
        });
        this.themeSub = this.themeService.getTheme('assets/data/theme.data.json').subscribe(list => {
            this.themeList = list;
            this.themeSelectText = this.themeList.filter(value => value.name === this.themeSelectCode)[0].text;
        });
        this.langSub = this.langService.getLanguage('assets/data/language.data.json').subscribe(list => {
            this.langList = list;
            this.langSelectText = this.langList.filter(value => value.code === this.langSelectCode)[0].text;
        });
    }

    ngOnDestroy() {
        if (this.libSub !== undefined) {
            this.libSub.unsubscribe();
        }

        if (this.modeSub !== undefined) {
            this.modeSub.unsubscribe();
        }

        if (this.langSub !== undefined) {
            this.langSub.unsubscribe();
        }

        if (this.dialogSub !== undefined) {
            this.dialogSub.unsubscribe();
        }
    }

    listenModeChange(change: MatRadioChange): void {
        this.modeSelectText = this.modeList.filter(value => value.mode === change.value)[0].text;
        this.render.setAttribute(document.body, 'class', 'theme ' + this.themeSelectCode + '-' + change.value);
    }

    listenThemeChange(change: MatRadioChange): void {
        this.themeSelectText = this.themeList.filter(value => value.name === change.value)[0].text;
        this.render.setAttribute(document.body, 'class', 'theme ' + change.value + '-' + this.modeSelectCode);
    }

    listenLanguageChange(change: MatRadioChange): void {
        this.langSelectText = this.langList.filter(value => value.code === change.value)[0].text;
    }

    handleSigninEvent(event: MouseEvent): void {
        let mdr: MatDialogRef<SigninComponent, any> = this.dialog.open(SigninComponent, {
            backdropClass: ['popup-dialog-mask'],
            disableClose: true,
            width: '800px'
        });
        mdr.addPanelClass(['popup-dialog']);
        this.dialogSub = mdr.afterClosed().subscribe(flag => this.logged = flag);
    }

}