import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vanta-background',
  standalone: true,
  imports: [],
  templateUrl: './vanta-background.component.html',
  styleUrl: './vanta-background.component.css'
})
export class VantaBackgroundComponent implements OnInit, OnDestroy {
  private vantaEffect: any;

  constructor(private renderer2: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.loadVantaScript().then(() => {
      this.vantaEffect = (window as any).VANTA.TRUNK({
        el: "#vanta-bg",
        backgroundAlpha: 10,
        backgroundColor: 0x222426,
        color: '#317c4a',
        gyroControls: false,
        mouseControls: false,
        touchControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        spacing: 10,
        chaos: 2,

      });
    }).catch(err => console.error(err));
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  exploreSpotify() {
    console.log('Explorar Spotify');
  }

  private loadVantaScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');

      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
      script.onload = () => {
        const vantaScript = this.renderer2.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.trunk.min.js';
        vantaScript.onload = resolve;
        vantaScript.onerror = reject;
        this.renderer2.appendChild(document.body, vantaScript);
      };
      script.onerror = reject;
      this.renderer2.appendChild(document.body, script);
    });
  }
}
