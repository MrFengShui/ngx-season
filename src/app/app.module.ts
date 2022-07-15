import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HIGHLIGHT_OPTIONS, HighlightOptions} from "ngx-highlightjs";

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
        FormsModule,
        RouterModule,
        AppRouterModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/page/demo'},
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                themePath: 'assets/highlight/default.css',
                languages: {
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    scss: () => import('highlight.js/lib/languages/scss'),
                    xml: () => import('highlight.js/lib/languages/xml'),
                },
            },
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
