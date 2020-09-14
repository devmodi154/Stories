import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  invalidCredentials: string;

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  registerMode = false;

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const storyRaterToken = this.cookieService.get('story-reader-token'); // Grabbing token cookie
    if( storyRaterToken ) {
      this.router.navigate(['/stories']);
    }
  }

  saveForm() {
    if (!this.registerMode){
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser()
        },
        error => console.log(error)
      );
    }
  }

  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set("story-reader-token", result.token); //Setting cookie for a user
        this.router.navigate(['/stories']);
      },
      error => {
        this.invalidCredentials = "Invalid Credentials! Try Again :/";
      }
    );
  }


}
