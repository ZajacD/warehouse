import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AddUser } from '../../model/addUser';

import { Seller } from '../../model/seller';
import { ValidationService } from '../../services/validation.service';
import { TaxNumberValidator } from '../../services/taxnumber-check.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add.user.component.html',
  styleUrls: ['./add.user.component.css']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup;
  public user: User = new User();
  public isSaved = false;
  public hide = true;
  public hideConfirmPassword = true;
  public url;
  public file;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.email]],
      password: ['', [Validators.required, ValidationService.password]],
      confirmPassword: ['', Validators.required],
      role: [[Validators.required]],
    },
      {
        validator: ValidationService.MatchPassword,
      }
    );
  }
  saveUser(value) {
    if (this.userForm.valid) {
      var addUser = new AddUser();
      addUser.password = this.userForm.value.password;
      addUser.role = this.userForm.value.role;
      addUser.username = this.userForm.value.email;
      this.http.post<any>(environment.API_URL + "/api/auth/api/addUser",addUser , { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        this.snackBar.open('Użytkownik dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

      },
        error => {
          if (error.status == 200) {
            this.snackBar.open('Użytkownik dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
          }
          else {
            this.snackBar.open('Nie można dodać użytkownika', '×', { verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

}
