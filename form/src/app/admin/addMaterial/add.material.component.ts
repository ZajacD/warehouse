
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Material } from '../../model/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './add.material.component.html',
  styleUrls: ['./add.material.component.css']
})

export class AddMaterialComponent implements OnInit {
  public myForm: FormGroup;
  public material = new Material();

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [],
      nofMaterial: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      length: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      supplierCountry: ['', [Validators.required]],
      status: []


    });
  }
  save(value) {
    if (this.myForm.valid) {
      this.http.post<any>(environment.API_URL + "/api/material", this.material, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        this.snackBar.open('Materiał dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

      },
        error => {
          if (error.status == 200) {
            this.snackBar.open('Materiał dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
          }
          else {
            this.snackBar.open('Nie można dodać materiału', '×', { verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

}