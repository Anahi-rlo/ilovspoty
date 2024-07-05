import { Component } from '@angular/core';
import { BasicMarginComponent } from '../../components/basic-margin/basic-margin.component';
import { UrlRequestComponent } from '../../components/url-request/url-request.component';
import { NewPlaylistComponent } from '../../components/new-playlist/new-playlist.component';

@Component({
  selector: 'app-youtubetospoty',
  standalone: true,
  imports: [BasicMarginComponent, UrlRequestComponent, NewPlaylistComponent, BasicMarginComponent],
  templateUrl: './youtubetospoty.page.html',
  styleUrl: './youtubetospoty.page.css'
})
export class YoutubetospotyPage {
  title: string= "";
  
}