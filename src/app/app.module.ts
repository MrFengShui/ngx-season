import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { MaterialModule } from './global/material.module';
import { OtherModule } from './views/other/other.module';
import { WidgetsModule } from './widgets/widgets.module';

import { ROOT_ROUTER } from './routers/root.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule.forRoot(ROOT_ROUTER, {
            preloadingStrategy: PreloadAllModules,
            useHash: true
        }),
        /**/
        MaterialModule,
        WidgetsModule,
        OtherModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
