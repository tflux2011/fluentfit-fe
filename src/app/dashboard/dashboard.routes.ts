import { Routes } from "@angular/router";
import { PracticeComponent } from "./practice.component";
import { RewardsComponent } from "./rewards.component";
import { SettingsComponent } from "./settings.component";
import { ResourcesComponent } from "./resources.component";
import { FeedbackComponent } from "./feedback.component";
import { PractiseSingleComponent } from "./practise-single.component";
import { ProgressComponent } from "./progress.component";
import { HomeComponent } from "../dashboard/home.component";

export const dashboard_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'practise', component: PracticeComponent },
    { path: 'practise/:id', component: PractiseSingleComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'rewards', component: RewardsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];