import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchTrack } from '../../interfaces/search-track.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-playlist',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './new-playlist.component.html',
  styleUrl: './new-playlist.component.css'
})
export class NewPlaylistComponent {
  @Input()
  public tracks: SearchTrack [] = []

  name: string = '';
  isValid: boolean = true;
  isEmpty: boolean = false;

  newPlaylist() {
    // Reiniciar estados de validación
    this.isEmpty = false;
    this.isValid = true;

    if (!this.name) {
      this.isEmpty = true;
    } else {

      if (this.isValid) {
        // Lógica para convertir la playlist
      }
    }
  }
}
