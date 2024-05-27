import { Component, Input } from '@angular/core';
import { CardMenu } from '../../interfaces/card-menu.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.css'
})
export class CardMenuComponent {
  @Input()
  public card: CardMenu = {
    url: '',
    name: '',
    icon: '',
  };

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate([this.card.url]);
  }
}
