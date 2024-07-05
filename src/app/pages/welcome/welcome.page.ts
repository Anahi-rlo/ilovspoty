import { Component } from '@angular/core';
import { VantaBackgroundComponent } from '../../components/vanta-background/vanta-background.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [VantaBackgroundComponent],
  templateUrl: './welcome.page.html',
  styleUrl: './welcome.page.css'
})
export class WelcomePage {
  constructor(private authService: AuthService) { }

  authenticate() {
    this.authService.login();
  }
}
