import { Component, Input } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input()
  public playlist: Playlist = {
    id: 0,
    name: "",
    author: '', 
    image: ''
  };

}
