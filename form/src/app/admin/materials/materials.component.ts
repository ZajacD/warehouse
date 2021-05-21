
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {
  pageNumber: number = 0;
  displayedColumns = []
  displayItems: any[] = [];
  allMaterialFiler: any[] = [];
  allMaterials: any[] = [];
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
  }
  ngOnInit() {
    if (localStorage.getItem("permissions").includes("ROLE_ADMIN")) {
      this.displayedColumns = ['no', 'nofMaterial', 'height', 'length', 'width', 'weight', 'supplier', 'supplierCountry', 'priority', 'edit', 'delete']
    } else {
      this.displayedColumns = ['no', 'nofMaterial', 'height', 'length', 'width', 'weight', 'supplier', 'supplierCountry', 'priority']

    }
    this.http.get<any>(environment.API_URL + "/api/materials", { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
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
        return it.supplier.toLowerCase().includes(filterValue.toLowerCase());
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
    this.router.navigate(['/editMaterial/' + value.id]);
  }
  delete(value) {
    this.http.delete<any>(environment.API_URL + "/api/material/" + value.id, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
      this.ngOnInit();
      this.snackBar.open('Materiał usuniety poprawnie', '×', { verticalPosition: 'top', duration: 6000 });

    },
      error => {
        if (error.status == 200) {
          this.snackBar.open('Materiał usuniety poprawnie', '×', { verticalPosition: 'top', duration: 6000 });
        }
        else {
          this.snackBar.open('Nie można usuniąć materiału', '×', { verticalPosition: 'top', duration: 3000 });
        }
      });

  }
  save(value) {
  }
}