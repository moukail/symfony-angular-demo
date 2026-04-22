import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'playlist',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'playlist',
        component: PlaylistComponent
    },
    {
        path: '**',
        redirectTo: 'playlist'
    }
];
