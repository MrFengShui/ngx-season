import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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