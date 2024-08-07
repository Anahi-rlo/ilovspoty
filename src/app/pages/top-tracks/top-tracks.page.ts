import { Component } from '@angular/core';
import { TracksListComponent } from '../../components/tracks-list/tracks-list.component';
import { Track } from '../../interfaces/track.interface';
import { SpotifyService } from '../../services/spotify.service';
import { RouterOutlet } from '@angular/router';
import { BasicMarginComponent } from '../../components/basic-margin/basic-margin.component';

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [RouterOutlet, TracksListComponent, BasicMarginComponent],
  templateUrl: './top-tracks.page.html',
  styleUrl: './top-tracks.page.css'
})
export class TopTracksPage {
  public title: string = "My Top Tracks";
  tracks: Track[] = []; 

  constructor(private SpotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.SpotifyService.getTopTracks().subscribe({
      next: (data) => {
        // console.log('Top artists:', data);
        this.tracks = data;
      },
      error: (err) => {
        console.error('Error al obtener los mejores tracks:', err);
      }
    });
  }
}
