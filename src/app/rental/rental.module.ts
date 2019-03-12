import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { NgPipesModule } from 'ngx-pipes';

import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { UppserCasePipe } from '../common/pipes/uppercase.pipe';

const routes: Routes = [
    {path: 'rentals', 
    component: RentalComponent,
    children: [
        {path: '', component: RentalListComponent},
        {path: ':rentalId', component: RentalDetailComponent}
    ]
}
  ]
@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppserCasePipe
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        NgPipesModule
    ],
    providers: [RentalService]
})
export class RentalModule {

}