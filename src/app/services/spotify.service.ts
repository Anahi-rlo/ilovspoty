import { Injectable } from '@angular/core';
import { Track } from '../interfaces/track.interface';
import { Playlist } from '../interfaces/playlist.interface';
import { Artist } from '../interfaces/artist.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  public tracks: Track[] = [
    {
      id: 1,
      name: "Echoes of Time",
      artist: "Synthwave Master",
      image: "https://picsum.photos/300/300",
      album: "Synthwave Dreams"
    },
    {
      id: 2,
      name: "Lunar Eclipse",
      artist: "Celestial Voices",
      image: "https://picsum.photos/300/300",
      album: "Space Journey"
    },
    {
      id: 3,
      name: "Ocean's Whisper",
      artist: "Tranquil Tides",
      image: "https://picsum.photos/300/300",
      album: "Calm Waters"
    }
  ];

  // Información falsa para playlists
  public playlists: Playlist[] = [
    {
      id: 1,
      name: "Morning Vibes",
      author: "DJ Sunrise",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 2,
      name: "Workout Hits",
      author: "Fitness Guru",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 3,
      name: "Relaxation Tunes",
      author: "Chill Master",
      image: "https://picsum.photos/300/300"
    }
  ]

  // Información falsa para artists
  public artists: Artist[] = [
    {
      id: 1,
      name: "Synthwave Master",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 2,
      name: "Celestial Voices",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 3,
      name: "Tranquil Tides",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 1,
      name: "Synthwave Master",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 2,
      name: "Celestial Voices",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 3,
      name: "Tranquil Tides",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 1,
      name: "Synthwave Master",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 2,
      name: "Celestial Voices",
      image: "https://picsum.photos/300/300"
    },
    {
      id: 3,
      name: "Tranquil Tides",
      image: "https://picsum.photos/300/300"
    }
  ]

  constructor(private http: HttpClient) { }

  public fetchTracks(searchTerm = ""): void {
    const token = localStorage.getItem("auth_token") ?? "";
    this.tracks = [];
  }

  public fetchPlaylists(searchTerm = ""): void {
    const token = localStorage.getItem("auth_token") ?? "";
    this.playlists = [];
  }

  public fetchArtists(searchTerm = ""): void {
    const token = localStorage.getItem("auth_token") ?? "";
    this.artists = [];
  }
}
