import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  signOut() {
    window.sessionStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(USERNAME_KEY);
    }
    return null;
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    const authoritiesString = sessionStorage.getItem(AUTHORITIES_KEY);
    if (authoritiesString) {
      if (sessionStorage.getItem(TOKEN_KEY)) {
        const authorities = JSON.parse(authoritiesString);
        authorities.forEach((authority: string) => {
          this.roles.push(authority);
        });
      }
    }

    return this.roles;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}


// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common'

// const TOKEN_KEY = 'AuthToken';
// const USERNAME_KEY = 'AuthUsername';
// const AUTHORITIES_KEY = 'AuthAuthorities';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenStorageService {
//   private roles: Array<string> = [];
//   constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

//   signOut() {
//     window.sessionStorage.clear();
//   }

//   public saveToken(token: string) {
//     window.sessionStorage.removeItem(TOKEN_KEY);
//     window.sessionStorage.setItem(TOKEN_KEY, token);
//   }

//   // public getToken(): string | null{
//   //   return sessionStorage.getItem(TOKEN_KEY);
//   // }

//   public getToken(): string | null {
//     // debugger
//     if (isPlatformBrowser(this.platformId)) {
//       return sessionStorage.getItem(TOKEN_KEY);
//     }
//     return null;
//   }

//   public saveUsername(username: string) {
//     window.sessionStorage.removeItem(USERNAME_KEY);
//     window.sessionStorage.setItem(USERNAME_KEY, username);
//   }

//   // public getUsername(): string | null {
//   //   return sessionStorage.getItem(USERNAME_KEY);
//   // }

//   public getUsername(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       return sessionStorage.getItem(USERNAME_KEY);
//     }
//     return null;
//   }

//   public saveAuthorities(authorities: string[]) {
//     console.log('saveAuthorities');
//     console.log(authorities);
//     window.sessionStorage.removeItem(AUTHORITIES_KEY);
//     window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
//   }

//   public getAuthorities(): string[] {
//     this.roles = [];

//     const authoritiesString = sessionStorage.getItem(AUTHORITIES_KEY);
//     console.log(sessionStorage.getItem(AUTHORITIES_KEY));

//     if (authoritiesString) {
//       if (sessionStorage.getItem(TOKEN_KEY)) {
//         const authorities = JSON.parse(authoritiesString);
//         authorities.forEach((authority: string) => {
//           this.roles.push(authority);
//         });
//       }
//     }

//     return this.roles;
//   }
// }
