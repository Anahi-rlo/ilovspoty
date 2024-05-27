import { Component } from '@angular/core';
import { VantaBackgroundComponent } from '../../components/vanta-background/vanta-background.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [VantaBackgroundComponent],
  templateUrl: './welcome.page.html',
  styleUrl: './welcome.page.css'
})
export class WelcomePage {
  exploreSpotify() {
    console.log('Explorar Spotify');
  }
}
