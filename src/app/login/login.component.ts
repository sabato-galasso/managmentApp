import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Login} from '../models/Login';
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

  user: Login = {email : '', password: '', token: ''};
  errMess: string;
  returnUrl: Params | string;
  showSpinner = false;
  hide = true;

  ngOnInit() {
    // reset login status
   // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams || '/';
  }

  onSubmit() {
    this.loginService.submitLogin(this.user).subscribe(
      user => {
        this.showSpinner = true;

        // login successful so redirect to return url
        if (user) {
          this.user = user;
          this.router.navigateByUrl('/home');
        }
      },
        errmess => {
        console.log(errmess);
        return this.errMess = errmess as any;
    },
      () => {
             this.showSpinner = false;
      });

    setTimeout(() => {
      this.errMess = null;
    }, 5000);
  }
}
