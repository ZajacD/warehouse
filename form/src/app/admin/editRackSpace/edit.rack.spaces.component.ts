
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RackSpace } from '../../model/rackSpace';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './edit.rack.spaces.component.html',
  styleUrls: ['./edit.rack.spaces.component.css']
})

export class EditRackSpacesComponent implements OnInit {
  public myForm: FormGroup;
  public rackSpace = new RackSpace;
  public idOfRackSpace;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute
  ) {
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
    this.idOfRackSpace = this.route.snapshot.params['id'];
    console.log(this.idOfRackSpace);
    this.http.get<any>(environment.API_URL + "/api/rackSpace/" + this.idOfRackSpace, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.rackSpace.id = value.id;
      this.rackSpace.width = value.width;
      this.rackSpace.height = value.height;
      this.rackSpace.length = value.length;
      this.rackSpace.status = value.status;
      this.rackSpace.maxWeight = value.maxWeight;
      this.rackSpace.priority = value.priority;
      this.rackSpace.rackId = value.rackId;
    });
  }
  save(value) {
    if (this.myForm.valid) {
      this.http.post<any>(environment.API_URL + "/api/rackSpace", this.rackSpace, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      });
    }
  }

}