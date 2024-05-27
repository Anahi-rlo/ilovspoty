import { Component, Input } from '@angular/core';
import { Track } from '../../interfaces/track.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tracks-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tracks-list.component.html',
  styleUrl: './tracks-list.component.css'
})
export class TracksListComponent {
  @Input()
  public tracks: Track[] = []
}
