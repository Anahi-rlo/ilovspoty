import { Component, OnInit } from '@angular/core';
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
export class TopArtistsPage implements OnInit {

  public title: string = "My Top Artists";
  artists: Artist[] = [];
  constructor(private SpotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.SpotifyService.getTopArtists().subscribe({
      next: (data) => {
        // console.log('Top artists:', data);
        this.artists = data;
      },
      error: (err) => {
        console.error('Error al obtener los mejores artistas:', err);
      }
    });
  }

}
