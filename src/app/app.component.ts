import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles?: string[];
  authority?: string;
  showPhoneContainer: boolean = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.updateAuthority();
    }

    this.tokenStorage.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.updateAuthority();
      } else {
        this.authority = undefined;
      }
    });
  }

  private updateAuthority() {
    this.roles = this.tokenStorage.getAuthorities();
    this.roles.every(role => {
      if (role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false; 
      }
      else if (role === 'ROLE_PM') {
        this.authority = 'pm';
        return false;
      }
      this.authority = 'user';
      return true;
    });
  }
}




// import { Component, OnInit  } from '@angular/core';
// import { TokenStorageService } from './auth/token-storage.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {

//   roles?: string[];
//   authority?: string;
//   showPhoneContainer: boolean = false;

//   constructor(private router: Router, private tokenStorage: TokenStorageService) { }

//   ngOnInit() {
//     if (this.tokenStorage.getToken()) {
//       this.roles = this.tokenStorage.getAuthorities();
//       this.roles.every(role => {

//         if (role === 'ROLE_ADMIN') {
//           this.authority = 'admin';
//           return false;
//         } else if (role === 'ROLE_PM') {
//           this.authority = 'pm';
//           return false;
//         }

//         this.authority = 'user';

//         return true;
//       });
//     }
//   }
// }
