import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  template: '<p>Logging in...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const code = params['code'];
      if (code) {
        try {
          await this.authService.fetchToken(code);
          this.router.navigate(['/home']);
        } catch (error) {
          console.error('Error fetching token', error);
          this.router.navigate(['/error']);
        }
      } else {
        console.error('Authorization code not found in URL');
        this.router.navigate(['/error']);
      }
    });
  }
}
