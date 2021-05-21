
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { couldStartTrivia } from 'typescript';
import { RackSpace } from 'src/app/model/rackSpace';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './rack.spaces.component.html',
  styleUrls: ['./rack.spaces.component.css']
})

export class RackSpacesComponent implements OnInit {
  pageNumber: number = 0;
  displayedColumns = ['no', 'nofRack', 'height', 'length', 'width', 'weight', 'status', 'priority', 'edit', 'delete']
  displayItems: any[] = [];
  allMaterialFiler: any[] = [];
  allMaterials: any[] = [];
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
  }
  ngOnInit() {
    if (localStorage.getItem("permissions").includes("ROLE_ADMIN")) {
      this.displayedColumns = ['no', 'nofRack', 'height', 'length', 'width', 'weight', 'status', 'priority', 'edit', 'delete'];
    } else if (localStorage.getItem("permissions").includes("ROLE_USER")) {
      this.displayedColumns = ['no', 'nofRack', 'height', 'length', 'width', 'weight', 'status', 'priority', 'save', 'free'];
    }
    this.http.get<any>(environment.API_URL + "/api/rackSpaces", { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.allMaterials = value;
      this.displayItems = this.allMaterials.slice(0, 10);
    });
  }
  applyFilter(filterValue: string) {
    this.allMaterialFiler = this.allMaterials;
    if (filterValue.length == 0) {
      this.allMaterialFiler = this.allMaterials;
      this.displayItems = this.allMaterialFiler.slice(0, 10);
      this.pageNumber = 0
    }
    else {
      this.allMaterialFiler = this.allMaterialFiler.filter(it => {
        return it.rackId.toLowerCase().includes(filterValue.toLowerCase());
      });
      this.displayItems = this.allMaterialFiler.slice(0, 10);
      this.pageNumber = 0
    }

  }
  pageChange(page) {
    let start = page.pageIndex * page.pageSize;
    this.pageNumber = page.pageIndex;
    this.displayItems = this.allMaterials.slice(start, start + page.pageSize);
  }
  edit(value) {
    this.router.navigate(['/editRackSpaces/' + value.id]);
  }
  delete(value) {
    this.http.delete<any>(environment.API_URL + "/api/rackSpace/" + value.id, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.ngOnInit();
      this.snackBar.open('Miejsce regałowe usuniete poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

    },
      error => {
        if (error.status == 200) {
          this.snackBar.open('Miejsce regałowe usuniete poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
        }
        else {
          this.snackBar.open('Nie można usuniąć miejsca regałowego', '×', { verticalPosition: 'top', duration: 3000 });
        }
      });


  }
  save(element) {
    var rackSpace = new RackSpace();
    rackSpace.id = element.id;
    this.http.put<any>(environment.API_URL + "/api/rackSpace/take/" + element.id, rackSpace, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.ngOnInit();
    });
  }
  free(element) {
    var rackSpace = new RackSpace();
    rackSpace.id = element.id;
    this.http.put<any>(environment.API_URL + "/api/rackSpace/free/" + element.id, rackSpace, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.ngOnInit();
    });
  }
}