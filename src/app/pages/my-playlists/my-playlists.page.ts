import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { PlaylistsListComponent } from '../../components/playlists-list/playlists-list.component';
import { RouterOutlet } from '@angular/router';
import { BasicMarginComponent } from '../../components/basic-margin/basic-margin.component';

@Component({
  selector: 'app-my-playlists',
  standalone: true,
  imports: [RouterOutlet, PlaylistComponent, PlaylistsListComponent, BasicMarginComponent],
  templateUrl: './my-playlists.page.html',
  styleUrl: './my-playlists.page.css'
})
export class MyPlaylistsPage {
  title : string= "My Playlists";

  constructor(private SpotifyService: SpotifyService) {
    // this.SpotifyService.fetchPlaylists();
  }

  get playlists(): Playlist[]{
    return this.SpotifyService.playlists;
  }

}
