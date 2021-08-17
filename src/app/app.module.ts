import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OctopusButtonModule } from './components/button/button.module';
import { OctopusListModule } from './components/list/list.module';
import { OctopusRippleModule } from './components/ripple/ripple.module';

import { DemoViewModule } from './demo/demo.module';
import { OctopusLayoutModule } from './layout/layout.module';

const ROOT_ROUTERS: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROOT_ROUTERS, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      initialNavigation: 'enabled'
    }),
    OctopusButtonModule,
    OctopusListModule,
    OctopusLayoutModule,
    DemoViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
