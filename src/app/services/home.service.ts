import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LanguageEntity, ModeEntity, ThemeEntity } from "../models/avatar.model";
import { LanguageUnitModel, ThemeUnitModel } from "../models/service/local.model";

import { SidenavRouterEntity } from "../models/sidenav.model";

@Injectable({
    providedIn: 'root'
})
export class HomeSidenavService {

    constructor(private http: HttpClient) { }

    getNavlink(url: string): Observable<SidenavRouterEntity[]> {
        return this.http.get<SidenavRouterEntity[]>(url, { responseType: 'json' });
    }

}

@Injectable({
    providedIn: 'root'
})
export class HomeLanguageService {

    constructor(private http: HttpClient) { }

    getLanguage(url: string): Observable<LanguageEntity[]> {
        return this.http.get<LanguageEntity[]>(url, { responseType: 'json' });
    }

    fetch(): Observable<LanguageUnitModel[]> {
        return this.http.get<LanguageUnitModel[]>('assets/data/language.data.json', { responseType: 'json' });
    }

}

@Injectable({
    providedIn: 'root'
})
export class HomeModeService {

    constructor(private http: HttpClient) { }

    getMode(url: string): Observable<ModeEntity[]> {
        return this.http.get<ModeEntity[]>(url, { responseType: 'json' });
    }

}

@Injectable({
    providedIn: 'root'
})
export class HomeThemeService {

    constructor(private http: HttpClient) { }

    getTheme(url: string): Observable<ThemeEntity[]> {
        return this.http.get<ThemeEntity[]>(url, { responseType: 'json' });
    }

    fetch(): Observable<ThemeUnitModel[]> {
        return this.http.get<ThemeUnitModel[]>('assets/data/theme.data.json', { responseType: 'json' });
    }

}