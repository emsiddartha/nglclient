import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalValues } from './globalValues.service';
import { ImportCatalogueComponent } from './import-catalogue/import-catalogue.component';

const appRoutes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'importCatalogue',component: ImportCatalogueComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImportCatalogueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GlobalValues],
  bootstrap: [AppComponent]
})
export class AppModule { }
