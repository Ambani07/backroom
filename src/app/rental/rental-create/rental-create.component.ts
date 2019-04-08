import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'br-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental : Rental;
  rentalCategories = Rental.CATEGORIES;
  errors : any[] = [];
  @Input() location : string;
  address: any[] = [];


  constructor(private rentalService: RentalService, private router: Router) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(){

    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );

    
  }

  handleImageChange(){
    this.newRental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }

  updatedAddress(data: any){
    this.address =  data['formatted_address'].split(", ");
    this.newRental.street = this.address[0];
    this.newRental.city = this.address[1];
    this.newRental.suburb = this.address[2];
  }

}
