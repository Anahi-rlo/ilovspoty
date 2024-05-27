import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-request',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './url-request.component.html',
  styleUrl: './url-request.component.css'
})
export class UrlRequestComponent {
  url: string = '';
  isValidUrl: boolean = true;
  isUrlEmpty: boolean = false;

  searchPlaylist() {
    // Reiniciar estados de validación
    this.isUrlEmpty = false;
    this.isValidUrl = true;

    if (!this.url) {
      this.isUrlEmpty = true;
    } else {
      // Validar la URL de la playlist de YouTube
      const youtubePlaylistRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      this.isValidUrl = youtubePlaylistRegex.test(this.url);

      if (this.isValidUrl) {
        // Lógica para convertir la playlist
      }
    }
  }

}
