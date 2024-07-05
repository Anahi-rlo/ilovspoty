import { Component, OnInit } from '@angular/core';
import { BasicMarginComponent } from '../../components/basic-margin/basic-margin.component';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';
import { NgFor } from '@angular/common';
import { CardMenu } from '../../interfaces/card-menu.interface';
import { VantaBackgroundComponent } from '../../components/vanta-background/vanta-background.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasicMarginComponent, CardMenuComponent, NgFor, VantaBackgroundComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage implements OnInit {
  public cardsMenu: CardMenu[] = [{
    url: '/toptracks',
    name: 'Top Tracks',
    icon: 'bi bi-music-note-list'
  },
  {
    url: '/topartists',
    name: 'Top Artists',
    icon: 'bi bi-people'
  },
  {
    url: '/myplaylists',
    name: 'My Playlists',
    icon: 'bi bi-collection-play'
  },
  {
    url: '/youtubetospoty',
    name: 'Convert YouTube to Spotify',
    icon: 'bi bi-arrow-repeat'
  }];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.fetchToken(code).then(() => {
          this.router.navigate(['/home']);
        });
      }
    });
  }



  login() {
    this.authService.login();
  }
}
