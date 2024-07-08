import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authoritySource = new BehaviorSubject<string | undefined>(undefined);
  // authority$ = this.authoritySource.asObservable();

  // constructor(private tokenStorage: TokenStorageService) { }

  // setAuthority() {
  //   const roles = this.tokenStorage.getAuthorities();
  //   if (roles.includes('ROLE_ADMIN')) {
  //     this.authoritySource.next('admin');
  //   } else if (roles.includes('ROLE_PM')) {
  //     this.authoritySource.next('pm');
  //   } else if (roles.includes('USER')){
  //     this.authoritySource.next('user');
  //   }
  // }
}
