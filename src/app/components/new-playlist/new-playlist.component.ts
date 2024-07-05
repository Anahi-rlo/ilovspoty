import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchTrack } from '../../interfaces/search-track.interface';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-new-playlist',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './new-playlist.component.html',
  styleUrl: './new-playlist.component.css'
})
export class NewPlaylistComponent {
  @Input()
  public tracks: SearchTrack[] = []

  public userId = 'your_user_id';
  @Input()
  name: string = '';

  playlistDescription = 'New playlist description';

  isPublic = false;

  isValid: boolean = true;
  isEmpty: boolean = false;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getCurrentUserProfile().subscribe(
      userProfile => {
        this.userId = userProfile.id;
      },
      error => {
        console.error('Error getting user profile:', error);
      }
    );
  }

  newPlaylist() {
    // Reiniciar estados de validación
    this.isEmpty = false;
    this.isValid = true;

    if (!this.name) {
      this.isEmpty = true;
    } else {

      if (this.isValid) {
        const tracksToAdd = this.tracks.filter(track => track.finded).map(track => `${track.artist} - ${track.name}`);
        if (tracksToAdd.length > 0 && this.name) {
          this.spotifyService.createNewPlaylist(this.userId, this.name, this.playlistDescription, this.isPublic, this.tracks).subscribe(
            response => {
              alert('Playlist created and tracks added');
              // this.spotifyService.updatePlaylists();
              // console.log('Playlist created and tracks added:', response);
            },
            error => {
              alert('Error creating playlist'),
              console.error('Error creating playlist:', error);
            }
          );
        } else {
          alert("Falta el nombre de la playlist");
        }
      }
    }
  }
}

