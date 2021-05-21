
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../model/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})

export class SupplyComponent implements OnInit {

  public nofMaterial: number;
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
  }
  ngOnInit() {

  }
  applyFilter(filterValue: string) {


  }

  save() {
    if (this.nofMaterial > 0) {
      var material = new Material();
      material.nofMaterial = Number(this.nofMaterial);
      this.http.put<any>(environment.API_URL + "/api/supply", material, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {

      },
        error => {
          if (error.error && error.status == 200) {
            this.snackBar.open(error.error.text, '×', { verticalPosition: 'top', duration: 3000 });

          }
          else if (error.error && !error.error.message && error.error.includes("Cannot find rack space")) {
            this.snackBar.open('Nie ma wolnego miejsca dla tego materialu w magazynie', '×', { verticalPosition: 'top', duration: 3000 });

          }
          else {
            this.snackBar.open('Taki nr materiału nie istnieje w bazie danych', '×', { verticalPosition: 'top', duration: 3000 });

          }
        });

    }
  }
}