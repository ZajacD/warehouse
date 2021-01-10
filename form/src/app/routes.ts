import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UploadMaterialComponent } from './admin/uploadMaterial/upload.material.component';
import { UploadRackPlaceComponent } from './admin/uploadRackSpace/upload.rack.place.component';
import { AuthGuard } from "./guard/auth.guard";

export const appRoutes = [
  // { path: '', component: MainComponent },
   { path: 'login', component: LoginComponent },
  
  { path: 'registration', component: RegisterComponent },
  { path: 'uploadMaterial', component: UploadMaterialComponent,canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'uploadRackSpace', component: UploadRackPlaceComponent },
  
]
