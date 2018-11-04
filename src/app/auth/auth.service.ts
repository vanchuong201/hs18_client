import { Injectable } from '@angular/core';
import { ApiService } from '../ticket/api.service';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: string;
  expiresAt: number;
  userProfile: any;
  authenticated: boolean;
  redirectUrl: string;

  constructor(
    private ticket: ApiService,
    private router: Router,
    private message: NzMessageService
  ) { }

  getUserProfile() {
    return this.ticket.profile();
  }

  login(username: string, password: string) {
    let body = {
      email: username,
      password
    };
    this.ticket.login(body).subscribe(auth => {
      this.setSession(auth);
      let url = this.redirectUrl || '/';
      this.router.navigate([url]);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private setSession(data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_at', JSON.stringify(data.expires_in * 1000 + Date.now()));
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }
    let expiresAt = JSON.parse(localStorage.getItem('expires_at')) || Date.now();
    return Date.now() < (expiresAt - 3000);
  }
}
