import { Component, OnInit } from '@angular/core';
import {Role} from "ngx-permission/types/role.type";
import {RoleStoreService} from "ngx-permission/services/role-store/role-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( roleStoreService: RoleStoreService,) {
    console.log(localStorage.getItem("permissions"));
    const adminRole: Role = {
      name: 'ROLE_ADMIN',
      validationFunction: () => {
        let permissions = localStorage.getItem("permissions");

        if (permissions === null) {
          return false;
        }
        else {
          console.log(permissions.includes("ROLE_ADMIN"));
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
