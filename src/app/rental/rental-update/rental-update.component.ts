import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { UcWordsPipe } from 'ngx-pipes';

import { Subject } from 'rxjs';

@Component({
  selector: 'br-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental : Rental;

  locationSubject: Subject<any> = new Subject();

  rentalCategories : string[] = Rental.CATEGORIES;

  constructor(private route: ActivatedRoute, 
    private rentalService: RentalService,
    private toastr: ToastrManager,
    private upperPipe: UcWordsPipe) {
      this.transformLocation = this.transformLocation.bind(this);
     }

  ngOnInit() {
    // this.rental = new Rental();
    this.route.params.subscribe(
      (params) => {
        
        this.getRental(params['rentalId']);
      },
    );
  }
  
  transformLocation(location: string): string{
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string){
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental : Rental) => {
        this.rental = rental;
        
      }
    );
  }

  updateRental(rentalId: string, rentalData: any){
    
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;

        if(rentalData.city || rentalData.street){
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      },

      (errorResponse: HttpErrorResponse) => {
        this.toastr.errorToastr(errorResponse.error.errors[0].detail, 'Error!');
        this.getRental(rentalId);
      });
  }

  countBedroomsAssets(assetNum: number){
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetNum;
  }
}
