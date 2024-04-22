import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    // Not found
    { path: '**', redirectTo: '' },
];