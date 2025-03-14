import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout.component";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";



export const auth_routes: Routes = [
    { 
        path: '', 
        component: AuthLayoutComponent,
        children: [
            { path: 'sign-up', component: SignupComponent },
            { path: 'sign-in', component: SigninComponent },
        ]
}
   ];