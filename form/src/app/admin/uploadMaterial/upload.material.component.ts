import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { couldStartTrivia } from 'typescript';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  public fileName='';

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {

  }
  fileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.file = event;
      this.fileName = event.target.files[0].name;
    }
  }

  save() {
    let fileList: FileList = this.file.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      this.http.post(environment.API_URL + "/api/uploadMaterial/" + localStorage.getItem("user_id"), formData, { headers: headers }).pipe(
        catchError(error => observableThrowError(error)))
        .subscribe(data => {
          this.fileName = "Plik zapisany";

          this.snackBar.open('Plik zapisany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

        },
          error => {
            if (error.status == 200) {
              this.snackBar.open('Plik  dodany poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
            }
            else {
              this.snackBar.open('Nie można dodać pliku', '×', { verticalPosition: 'top', duration: 3000 });
            }
          });

        
    }
  }
}

