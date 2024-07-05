import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { PlaylistItemSearch } from '../../interfaces/playlist-item-search.interface';
import { SearchTrack } from '../../interfaces/search-track.interface';
import { SpotifyService } from '../../services/spotify.service';
import { BasicMarginComponent } from '../basic-margin/basic-margin.component';
import { NewPlaylistComponent } from '../new-playlist/new-playlist.component';

@Component({
  selector: 'app-url-request',
  standalone: true,
  imports: [NgIf, FormsModule, BasicMarginComponent, NewPlaylistComponent],
  templateUrl: './url-request.component.html',
  styleUrl: './url-request.component.css'
})
export class UrlRequestComponent {
  url: string = '';
  isValidUrl: boolean = true;
  isUrlEmpty: boolean = false;

  playlistTitle: string = '';
  playlistItems: PlaylistItemSearch[] = [];

  searchResults: SearchTrack[] = [];
  playlistName: string = '';

  constructor(private youtubeService: YoutubeService, private spotifyService: SpotifyService) { }

  searchPlaylist() {
    // Reiniciar estados de validación
    this.isUrlEmpty = false;
    this.isValidUrl = true;

    if (!this.url) {
      this.isUrlEmpty = true;
    } else {
      const playlistId = this.getPlaylistId(this.url);
      if (playlistId) {
        this.youtubeService.getPlaylistDetails(playlistId).subscribe(
          details => this.playlistTitle = details.title,
          error => alert(error.message)
        );

        this.youtubeService.getPlaylistItems(playlistId).subscribe(
          items => {
            this.playlistItems = items;
            this.searchResults = [];
            items.forEach((item, index) => {
              this.spotifyService.searchTrack(item.title, item.artist).subscribe(
                result => {
                  this.searchResults.push({
                    id: result.length > 0 ? result[0].id : '',
                    name: item.title,
                    artist: item.artist,
                    finded: result.length > 0
                  });
                },
                error => {
                  const track: SearchTrack = {
                    id: '',
                    name: item.title,
                    artist: item.artist,
                    finded: false
                  };
                  this.searchResults.push(track);
                }
              );
            });
          },
          error => alert(error.message)
        );
      } else {
        alert('URL inválida de la playlist de YouTube.');
      }
    }
  }

  getPlaylistId(url: string): string | null {
    const regex = /[?&]list=([^#\&\?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
