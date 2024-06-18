import { Component, OnInit  } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  roles?: string[];
  authority?: string;

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {

        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          // debugger
          // this.router.navigate(['/admin']);
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }

        this.authority = 'user';

        return true;
      });
    }
  }
}
