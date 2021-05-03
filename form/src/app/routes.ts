import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UploadMaterialComponent } from './admin/uploadMaterial/upload.material.component';
import { UploadRackPlaceComponent } from './admin/uploadRackSpace/upload.rack.place.component';
import { AuthGuard } from "./guard/auth.guard";
import { MaterialsComponent } from './admin/materials/materials.component';
import { RackSpacesComponent } from './admin/rackSpaces/rack.spaces.component';
import { AddRackSpacesComponent } from './admin/addRackSpace/add.rack.spaces.component';
import { EditRackSpacesComponent } from './admin/editRackSpace/edit.rack.spaces.component';
import { AddMaterialComponent } from './admin/addMaterial/add.material.component';
import { EditMaterialComponent } from './admin/editMaterial/edit.material.component';
import { AddUserComponent } from './admin/addUser/add.user.component';
import { SupplyComponent } from './supply/supply.component';

export const appRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  {
    path: 'uploadMaterial', component: UploadMaterialComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  { path: 'uploadRackSpace', component: UploadRackPlaceComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'rackSpaces', component: RackSpacesComponent },
  { path: 'addRackSpaces', component: AddRackSpacesComponent },
  { path: 'editRackSpaces/:id', component: EditRackSpacesComponent },
  { path: 'addMaterial', component: AddMaterialComponent },
  { path: 'editMaterial/:id', component: EditMaterialComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'supply', component: SupplyComponent },
]
