import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/page/demo'},        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
