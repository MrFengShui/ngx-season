import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DemoDashboardView } from "./dashboard/dashboard.component";
import { DemoSectionComponent, DemoSectionCodeComponent, DemoSectionFootComponent } from "./demo.component";

@NgModule({
    declarations: [
        DemoSectionComponent,
        DemoSectionCodeComponent,
        DemoSectionFootComponent,
        DemoDashboardView
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        DemoSectionComponent,
        DemoSectionCodeComponent,
        DemoSectionFootComponent,
        DemoDashboardView
    ]
})
export class DemoModule { }