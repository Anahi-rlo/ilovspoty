import { Component, Input } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { NgFor } from '@angular/common';
import { ArtistComponent } from '../artist/artist.component';

@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [NgFor, ArtistComponent],
  templateUrl: './artists-list.component.html',
  styleUrl: './artists-list.component.css'
})
export class ArtistsListComponent {
  @Input()
  public artists: Artist[] = []
}
