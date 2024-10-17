import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PreloadAllModules, RouterModule} from "@angular/router";

import { rootRoutes } from './routes/root.routes';

import { PageModule } from './page/page.module';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forRoot(rootRoutes, { preloadingStrategy: PreloadAllModules }),

        PageModule
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/pages' }, 
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // provideRouter(rootRoutes, withDebugTracing())  // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
