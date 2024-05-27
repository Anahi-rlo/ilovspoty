import { Component } from '@angular/core';
import { ArtistsListComponent } from '../../components/artists-list/artists-list.component';
import { ArtistComponent } from '../../components/artist/artist.component';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../interfaces/artist.interface';
import { BasicMarginComponent } from '../../components/basic-margin/basic-margin.component';

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [ArtistsListComponent, ArtistComponent, BasicMarginComponent],
  templateUrl: './top-artists.page.html',
  styleUrl: './top-artists.page.css'
})
export class TopArtistsPage {

  public title: string ="My Top Artists";

  constructor(private SpotifyService: SpotifyService) {
    // this.SpotifyService.fetchArtists();
  }

  get artists(): Artist[]{
    return this.SpotifyService.artists;
  }
}
