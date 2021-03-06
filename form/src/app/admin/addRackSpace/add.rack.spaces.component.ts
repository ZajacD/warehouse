
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RackSpace } from '../../model/rackSpace';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './add.rack.spaces.component.html',
  styleUrls: ['./add.rack.spaces.component.css']
})

export class AddRackSpacesComponent implements OnInit {
  public myForm: FormGroup;
  public rackSpace = new RackSpace();

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [],
      rackId: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      length: ['', [Validators.required]],
      maxWeight: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: []


    });

  }
  save(value) {
    if (this.myForm.valid) {
      this.http.post<any>(environment.API_URL + "/api/rackSpace", this.rackSpace, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        this.snackBar.open('Miejsce regałowe dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

      },
        error => {
          if (error.status == 200) {
            this.snackBar.open('Miejsce regałowe dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
          }
          else {
            this.snackBar.open('Nie można dodać miejsca regałowego', '×', { verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

}