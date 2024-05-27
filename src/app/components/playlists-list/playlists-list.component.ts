import { Component, Input } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { NgFor } from '@angular/common';
import { PlaylistComponent } from '../playlist/playlist.component';
@Component({
  selector: 'app-playlists-list',
  standalone: true,
  imports: [NgFor, PlaylistComponent],
  templateUrl: './playlists-list.component.html',
  styleUrl: './playlists-list.component.css'
})
export class PlaylistsListComponent {
  @Input()
  public playlists: Playlist[] = []
}
