
import { Component, EventEmitter, OnInit, Output, } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './rack.spaces.component.html',
    styleUrls: ['./rack.spaces.component.css']
})

export class RackSpacesComponent implements OnInit {
    pageNumber: number = 0;
    displayedColumns = ['no', 'nofRack', 'height', 'length', 'width', 'weight', 'status', 'priority']
    displayItems: any[] = [];
    allMaterialFiler: any[] = [];
    allMaterials: any[]=[];
    constructor(private http: HttpClient) {
    }
    ngOnInit() {
        this.http.get<any>(environment.API_URL + "/api/rackSpaces", { headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_token')).append("Content-Type", "application/json") }).subscribe(value => {
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
}