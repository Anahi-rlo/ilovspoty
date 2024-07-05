import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyAAZUm3yacGqmIXLdDgdO4sqn17uO2pS9U'; // Reemplaza con tu API Key 
  constructor(private http: HttpClient) { }

  // Obtener detalles de la playlist (nombre de la playlist)
  getPlaylistDetails(playlistId: string): Observable<{ title: string }> {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.items.length > 0) {
          return { title: response.items[0].snippet.title };
        }
        throw new Error('No se encontró la playlist');
      })
    );
  }

  // Obtener los items de la playlist (nombre de las canciones y artista)
  getPlaylistItems(playlistId: string): Observable<{ title: string, artist: string }[]> {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.items.map((item: any) => ({
        title: item.snippet.title,
        artist: item.snippet.videoOwnerChannelTitle
      })))
    );
  }
}