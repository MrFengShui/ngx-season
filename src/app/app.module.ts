import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { MaterialModule } from './global/material.module';
import { OtherModule } from './views/other/other.module';

import { ROOT_ROUTER } from './routers/root.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(ROOT_ROUTER, {
            preloadingStrategy: PreloadAllModules,
            useHash: true
        }),
        /**/
        MaterialModule,
        OtherModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
