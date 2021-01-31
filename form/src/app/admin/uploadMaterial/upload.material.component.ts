import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { couldStartTrivia } from 'typescript';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError as observableThrowError, Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './upload.material.component.html',
  styleUrls: ['./upload.material.component.css']
})

export class UploadMaterialComponent implements OnInit {

  ngOnInit() {

  }
  public file;
  public document;
  public url;

  constructor(private http: HttpClient) {

  }
  fileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      console.log(event);
      console.log(event.target);
      console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.file = event;
    }
  }

  save() {
    console.log(localStorage.getItem('auth_token'));
    // this.http.get<any>(environment.API_URL + "/api/aaa", { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
    //   console.log("aaaa");
    //   });
    let fileList: FileList = this.file.target.files;
    if (fileList.length > 0) {
      console.log(fileList);
      let file: File = fileList[0];
      console.log(file);
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();
      // headers.append('Authorization', localStorage.getItem("auth_token"));
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      console.log(formData);
      console.log(localStorage.getItem("auth_token"));
      console.log(headers)


      this.http.post(environment.API_URL + "/api/uploadMaterial/" + localStorage.getItem("user_id"), formData, { headers: headers }).pipe(
        catchError(error => observableThrowError(error)))
        .subscribe(data => {
      

        }, error => {

        }

        )
    }
  }
}

