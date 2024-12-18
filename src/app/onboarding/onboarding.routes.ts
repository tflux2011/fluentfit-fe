import { Routes } from "@angular/router";
import { OnboardingComponent } from "./onboarding.component";
import { PrelimInterviewComponent } from "./prelim-interview.component";
import { ProfileSetupComponent } from "./profile-setup.component";



export const onboarding_routes: Routes = [
    { 
        path: '', 
        component: OnboardingComponent,
        children: [
            { path: 'profile-setup', component: ProfileSetupComponent },
            { path: 'prelim-interview', component: PrelimInterviewComponent },
            { path: '', redirectTo: 'profile-setup', pathMatch: 'full' }
        ]
}
   ];