import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { EditableModule } from '../common/components/editable/editable.module';
import { MapAutocompleteModule } from '../common/map-autocomplete/map-autocomplete.module';
import { CounterModule } from 'ngx-counter';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FooterComponent } from '../common/footer/footer.component';

import { RentalService } from './shared/rental.service';
import { HelperService } from '../common/service/helper.service';
import { BookingService } from '../booking/shared/booking.service';


import { UppserCasePipe } from '../common/pipes/uppercase.pipe';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from './shared/rental.guard';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';
import { RentalHomeComponent } from './rental-home/rental-home.component';
import { SearchBoxComponent } from '../common/search-box/search-box.component';


const routes: Routes = [
    {path: 'rentals', 
    component: RentalComponent,
    children: [
        {path: '', component: RentalListComponent},
        {path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard]},
        {path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard]},
        {path: ':rentalId', component: RentalDetailComponent},
        {path: ':city/homes', component: RentalSearchComponent}
    ]
}
  ]
  
@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppserCasePipe,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent,
        RentalUpdateComponent,
        RentalHomeComponent,
        SearchBoxComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule,
        EditableModule,
        MapAutocompleteModule,
        CounterModule.forRoot()
    ],
    providers: [
        RentalService,
        HelperService,
        BookingService,
        UcWordsPipe,
        RentalGuard]
})
export class RentalModule {

}