import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Playlist } from '../interfaces/playlist.interface';
import { Artist } from '../interfaces/artist.interface';
import { Track } from '../interfaces/track.interface';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { SearchTrack } from '../interfaces/search-track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';

  public tracks: Track[] = []
  public playlists: Playlist[] = []
  public artists: Artist[] = []

  constructor(private http: HttpClient) { }

  getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  getCurrentUserProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/me`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('Access token is missing');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`HTTP error: ${error.message}`);
    return throwError(() => new Error('An error occurred while fetching data from Spotify API.'));
  }


  getTopArtists(): Observable<Artist[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/me/top/artists?limit=50`, { headers })
      .pipe(
        map(response => response.items.map((item: any, index: number) => ({
          id: index + 1,
          name: item.name,
          image: item.images[0]?.url // Toma la primera imagen si existe, cambia el índice si necesitas otra imagen
        }))),
        catchError(this.handleError)
      );
  }

  getTopTracks(): Observable<Track[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/me/top/tracks?time_range=long_term`, { headers })
      .pipe(
        map(response => response.items.map((item: any, index: number) => ({
          id: index + 1,
          name: item.name,
          artist: item.artists.map((artist: any) => artist.name).join(', '),
          album: item.album.name,
          image: item.album.images[0]?.url
        }))),
        catchError(this.handleError)
      );
  }

  getUserPlaylists(): Observable<Playlist[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/me/playlists`, { headers })
      .pipe(
        map(response => response.items.map((item: any, index: number) => ({
          id: index + 1,
          name: item.name,
          author: item.owner.display_name,
          // image: item.images[0]?.url
          image: item.images && item.images.length > 0 ? item.images[0]?.url : null
        }))),
        catchError(this.handleError)
      );
  }

  searchTrack(title: string, artist: string): Observable<any[]> {
    const headers = this.getHeaders();
    const query = `q=track:${title}&type=track&limit=1`;
    return this.http.get<any>(`${this.apiUrl}/search?${query}`, { headers })
      .pipe(
        map(response => response.tracks.items)
      );
  }

  ////////////////////////////

  createNewPlaylist(userId: string, name: string, description: string, isPublic: boolean = false, tracks: SearchTrack[]): Observable<any> {
    const body = {
      name: name,
      description: description,
      public: isPublic
    };

    return this.newPlaylist(userId, body).pipe(
      switchMap((playlist: any) => this.addItemsToPlaylist(playlist.id, tracks))
    );
  }


  newPlaylist(userId: string, body: { name: string, description: string, public: boolean }): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.apiUrl}/users/${userId}/playlists`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getUris(tracks: SearchTrack[]): string[] {
    return tracks.filter(track => track.finded).map(track => `spotify:track:${track.id}`);
  }

  addItemsToPlaylist(playlistId: string, tracks: SearchTrack[]): Observable<any> {
    const headers = this.getHeaders();
    const uris = this.getUris(tracks);

    if (uris.length === 0) {
      console.log("error");
      throw new Error('No tracks with finded: true to add to the playlist');
    }

    const body = {
      uris: uris,
      position: 0
    };

    return this.http.post<any>(`${this.apiUrl}/playlists/${playlistId}/tracks`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

}



