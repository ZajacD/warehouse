import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { Seller } from '../model/seller';
import { ValidationService } from '../services/validation.service';
import { TaxNumberValidator } from '../services/taxnumber-check.directive';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public user: User = new User();
  public seller: Seller = new Seller();
  public title = "menu";
  public isSaved = false;
  public hide = true;
  public hideConfirmPassword = true;
  public url;
  public file;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router,
  ) {
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.email]],
      password: ['', [Validators.required, ValidationService.password]],
      confirmPassword: ['', Validators.required],
      name: ['', [Validators.required]],
      logo: [Validators.required],
      postcode: ['', [Validators.required, ValidationService.zipCode]],
      taxNumber: ['', [Validators.required, TaxNumberValidator()]],
      city: ['', [Validators.required, ValidationService.city]],
      country: ['', [Validators.required, ValidationService.country]],
    },
      {
        validator: ValidationService.MatchPassword,
      }
    );
  }
  saveUser(value) {
    if (this.userForm.valid) {
      this.user.seller = this.seller;
      this.http.post(environment.API_URL + '/api/auth/register', this.user).subscribe(res => {
        this.isSaved = true;
        this.router.navigate(['login']);
      },
        error => {
        });
    }
  }
}
