import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-margin',
  standalone: true,
  imports: [],
  templateUrl: './basic-margin.component.html',
  styleUrl: './basic-margin.component.css'
})
export class BasicMarginComponent {
  @Input()
  public title: string = ""; 
}
