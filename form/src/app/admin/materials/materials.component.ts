
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {
    pageNumber: number = 0;
    displayedColumns = ['no', 'nofMaterial', 'height', 'length', 'width', 'weight', 'supplier', 'supplierCountry', 'priority','edit','delete']
    displayItems: any[] = [];
    allMaterialFiler: any[] = [];
    allMaterials: any[]=[];
    constructor(private http: HttpClient, private router: Router) {
    }
    ngOnInit() {
        this.http.get<any>(environment.API_URL + "/api/materials", { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
            this.allMaterials = value;
            console.log(this.allMaterials);
            this.displayItems=this.allMaterials.slice(0, 10);
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
    edit(value)
    {
      this.router.navigate(['/editMaterial/' + value.id]);

      console.log(value);
    }
    delete(value)
    {
      this.http.delete<any>(environment.API_URL + "/api/material/" + value.id, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
        this.ngOnInit();
      });

    }
}