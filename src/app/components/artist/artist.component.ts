import { Component, Input } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent {
  @Input()
  public artist: Artist = {
    id: 0,
    name: "",
    image: ''
  };

}
