import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';

import {AppRouterModule} from "./router.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        AppRouterModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/page/demo'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
