import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserComponent } from './components/user/user.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { ChannelNewComponent } from './components/channel-new/channel-new.component';
import { ChannelDetailsComponent } from './components/channel-details/channel-details.component';
import { StreamComponent } from './components/stream/stream.component';
import { StreamNewComponent } from './components/stream-new/stream-new.component';
import { TvplayerComponent } from './components/tvplayer/tvplayer.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
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
        component: DashboardComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'channels',
        component: ChannelListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'channels/new',
        component: ChannelNewComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'channels/:id/streams',
        component: StreamComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'channels/:id/streams/new',
        component: StreamNewComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'channels/:id',
        component: ChannelDetailsComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'tvplayer',
        component: TvplayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'playlist',
        component: PlaylistComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
