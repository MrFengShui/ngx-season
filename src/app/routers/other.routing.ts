import { Routes } from "@angular/router";

import { ErrorComponent } from "../views/other/error/error.component";
import { SignupComponent } from "../views/other/signup/signup.component";

export const OTHER_ROUTER: Routes = [
    { path: 'other/error', redirectTo: '/other/error/404', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent, data: { breadcrumb: 'Sign Up' } },
    { path: 'error/:code', component: ErrorComponent, data: { breadcrumb: 'Error' } },
];