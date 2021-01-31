
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../model/material';

@Component({
  selector: 'app-login',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})

export class SupplyComponent implements OnInit {

  public nofMaterial = "";
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {

  }
  applyFilter(filterValue: string) {


  }

  save() {
    if (this.nofMaterial.length > 0) {
      console.log(this.nofMaterial);
      var material = new Material();
      material.nofMaterial = Number(this.nofMaterial);
      this.http.put<any>(environment.API_URL + "/api/supply", material, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        console.log(value);
      },
      error=>{
        console.log(error);
      });

    }
  }
}