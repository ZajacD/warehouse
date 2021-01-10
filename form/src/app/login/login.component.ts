import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { couldStartTrivia } from 'typescript';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  errorWrongPassword = null;
  wrongPassword = true;
  errorEmailNoConfirmed = null;
  public successTitleMessage;
  public successMessage;
  public failMessage;
  public failTitleMessage;
  public reCaptcha;
  public reCaptchaValid = false;
  public errorWrongCaptch;
  public reCaptchaValidDisplay = true;



  constructor(private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute, private dialog: MatDialog,
    private authService: AuthService,) {
  }

  ngOnInit() {


  }
  newPassword() {

  }

  forgottenPassword() {

  }
  login() {
    this.authService.login(this.model).subscribe(
      data => {
        console.log(data)
        localStorage.setItem('auth_token', "BearerJWT " + data.accessToken);
        localStorage.setItem('permissions', data.roles);
        this.router.navigate(['uploadMaterial']);
      },
      err => {
        console.log(err)

      }
    );
  }

}
