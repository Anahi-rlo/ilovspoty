import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private clientId = 'fda132a1d70e4c55b323479fc4c5ca8a';
    private clientSecret = '6ff968256f6048e1aea18ef2b3afdc11';
    private redirectUri = 'http://localhost:4200/callback'; // Componente de callback
    private authUrl = 'https://accounts.spotify.com/authorize';
    private tokenUrl = 'https://accounts.spotify.com/api/token';

    constructor(private http: HttpClient, private router: Router) { }

    generateRandomString(length: number): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    }

    async generateCodeChallenge(codeVerifier: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return this.base64encode(digest);
    }

    base64encode(buffer: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    async login() {
        const codeVerifier = this.generateRandomString(64);
        localStorage.setItem('code_verifier', codeVerifier);

        const codeChallenge = await this.generateCodeChallenge(codeVerifier);
        const params = new HttpParams({
            fromObject: {
                client_id: this.clientId,
                response_type: 'code',
                redirect_uri: this.redirectUri,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                scope: 'user-read-private user-read-email user-top-read  playlist-read-private playlist-modify-public playlist-modify-private'
            }
        });

        window.location.href = `${this.authUrl}?${params.toString()}`;
    }

    async fetchToken(code: string) {
        const codeVerifier = localStorage.getItem('code_verifier');

        if (!codeVerifier) {
            throw new Error('Code verifier not found in localStorage');
        }

        const body = new HttpParams({
            fromObject: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri,
                code_verifier: codeVerifier
            }
        });

        const response: any = await this.http.post(this.tokenUrl, body.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).toPromise();

        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/home']);
    }
}
