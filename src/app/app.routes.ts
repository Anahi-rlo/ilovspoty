import { Routes } from '@angular/router';
import { TopTracksPage } from './pages/top-tracks/top-tracks.page';
import { TopArtistsPage } from './pages/top-artists/top-artists.page';
import { HomePage } from './pages/home/home.page';
import { MyPlaylistsPage } from './pages/my-playlists/my-playlists.page';
import { ErrorPage } from './pages/error/error.page';
import { YoutubetospotyPage } from './pages/youtubetospoty/youtubetospoty.page';
import { WelcomePage } from './pages/welcome/welcome.page';

export const routes: Routes = [
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    { path: "welcome", component: WelcomePage },
    { path: "home", component: HomePage },
    { path: "toptracks", component: TopTracksPage },
    { path: "topartists", component: TopArtistsPage },
    { path: "myplaylists", component: MyPlaylistsPage },
    { path: "youtubetospoty", component: YoutubetospotyPage },
    { path: "error", component: ErrorPage },
    /* ** = cualquier ruta q no esta definida  aqui va arenderizar este componente
    en este caso la pantalla error*/
    //esta debe de encontrarse al final, para que si no encuentra ninguna de la lista, esta las elimine
    { path: "**", redirectTo: "error", pathMatch: "full" }
];
