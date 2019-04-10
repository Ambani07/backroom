import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './common/header/header.component';
import { MapAutocompleteModule } from './common/map-autocomplete/map-autocomplete.module';

import { AppComponent } from './app.component';


import { RentalModule } from './rental/rental.module';

import { ManageModule } from './manage/manage.module';

import { AuthModule } from './auth/auth.module';



const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ManageModule,
    MapAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
