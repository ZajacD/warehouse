
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RackSpace } from '../../model/rackSpace';
import { ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/model/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './edit.material.component.html',
  styleUrls: ['./edit.material.component.css']
})

export class EditMaterialComponent implements OnInit {
  public myForm: FormGroup;
  public material = new Material();
  public idOfMaterial;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, public snackBar: MatSnackBar
  ) {
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
    this.idOfMaterial = this.route.snapshot.params['id'];
    this.http.get<any>(environment.API_URL + "/api/material/" + this.idOfMaterial, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.material.id = value.id;
      this.material.width = value.width;
      this.material.height = value.height;
      this.material.length = value.length;
      this.material.status = value.status;
      this.material.weight = value.weight;
      this.material.priority = value.priority;
      this.material.supplier = value.supplier;
      this.material.supplierCountry = value.supplierCountry;
      this.material.nofMaterial = value.nofMaterial;

    });
  }
  save(value) {
    if (this.myForm.valid) {
      this.http.post<any>(environment.API_URL + "/api/material", this.material, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        this.snackBar.open('Materiał edytowany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

      },
        error => {
          if (error.status == 200) {
            this.snackBar.open('Materiał edytowany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
          }
          else {
            this.snackBar.open('Nie można edytować materiału', '×', { verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

}