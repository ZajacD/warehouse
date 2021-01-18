import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { ValidationService } from './services/validation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from './register/register.component'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './nav/navbar.component';
import { UsernameHeaderComponent } from './nav/username_header.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { UploadMaterialComponent } from './admin/uploadMaterial/upload.material.component';
import { UploadRackPlaceComponent } from './admin/uploadRackSpace/upload.rack.place.component';
import { MaterialsComponent } from './admin/materials/materials.component';
import { NgxPermissionModule } from 'ngx-permission/ngx-permission.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RackSpacesComponent } from './admin/rackSpaces/rack.spaces.component';
import { AddRackSpacesComponent } from './admin/addRackSpace/add.rack.spaces.component';
import { EditRackSpacesComponent } from './admin/editRackSpace/edit.rack.spaces.component';
import { AddMaterialComponent } from './admin/addMaterial/add.material.component';
import { EditMaterialComponent } from './admin/editMaterial/edit.material.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UsernameHeaderComponent,
    NavbarComponent,
    LoginComponent,
    UploadMaterialComponent,
    UploadRackPlaceComponent,
    MaterialsComponent,
    RackSpacesComponent,
    AddRackSpacesComponent,
    EditRackSpacesComponent,
    AddMaterialComponent,
    EditMaterialComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPasswordStrengthModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    NgxPermissionModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    ValidationService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
