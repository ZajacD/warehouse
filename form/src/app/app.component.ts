import { Component, OnInit } from '@angular/core';
import {Role} from "ngx-permission/types/role.type";
import {RoleStoreService} from "ngx-permission/services/role-store/role-store.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public router: Router,roleStoreService: RoleStoreService,) {
      router.events.subscribe(value => {
      
    });
    const adminRole: Role = {
      name: 'ROLE_ADMIN',
      validationFunction: () => {
        let permissions = localStorage.getItem("permissions");
        if (permissions === null) {
          return false;
        }
        else {
          return permissions.includes("ROLE_ADMIN")
        }

      }
    };

    const userRole: Role = {
      name: 'ROLE_USER',
      validationFunction: () => {
        let permissions = localStorage.getItem("permissions");
        if (permissions === null) {
          return false;
        }
        else {
          return permissions.includes("ROLE_USER")
        }

      }
    };
    const managerRole: Role = {
      name: 'ROLE_MANAGER',
      validationFunction: () => {
        let permissions = localStorage.getItem("permissions");
        if (permissions === null) {
          return false;
        }
        else {
          return permissions.includes("ROLE_MANAGER")
        }

      }
    };
    roleStoreService.defineRole(managerRole);
    roleStoreService.defineRole(userRole);
    roleStoreService.defineRole(adminRole)
  }
  ngOnInit() {
  }
}
