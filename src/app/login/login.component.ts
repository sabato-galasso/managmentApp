import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    @Inject('BaseURL') public baseURL,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  user = {username: '', password: ''};
  errMess: string;
  returnUrl: Params | string;


  ngOnInit() {
    // reset login status
   // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams || '/';
  }

  onSubmit() {
    this.loginService.submitLogin(this.user).subscribe(
      user => {
        // login successful so redirect to return url
        if (user) {
          this.user = user;
          localStorage.setItem('token', JSON.stringify(user));
          this.router.navigateByUrl('/home');
        }
      },
        errmess => {
        console.log(errmess);
        return this.errMess = errmess as any;
    });

    setTimeout(() => {
      this.errMess = null;
    }, 5000);
  }
}
