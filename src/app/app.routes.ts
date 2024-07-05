import { RouterModule, Routes } from '@angular/router';
import { TopTracksPage } from './pages/top-tracks/top-tracks.page';
import { TopArtistsPage } from './pages/top-artists/top-artists.page';
import { HomePage } from './pages/home/home.page';
import { MyPlaylistsPage } from './pages/my-playlists/my-playlists.page';
import { ErrorPage } from './pages/error/error.page';
import { YoutubetospotyPage } from './pages/youtubetospoty/youtubetospoty.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './components/callback/callback.component';

export const routes: Routes = [
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    { path: "welcome", component: WelcomePage },
    { path: "home", component: HomePage, canActivate: [AuthGuardService] },
    { path: "toptracks", component: TopTracksPage, canActivate: [AuthGuardService] },
    { path: "topartists", component: TopArtistsPage, canActivate: [AuthGuardService] },
    { path: "myplaylists", component: MyPlaylistsPage, canActivate: [AuthGuardService] },
    { path: "youtubetospoty", component: YoutubetospotyPage, canActivate: [AuthGuardService] },
    { path: 'callback', component: CallbackComponent },
    { path: "error", component: ErrorPage },
    { path: "**", redirectTo: "error", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
