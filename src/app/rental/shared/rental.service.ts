import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService {

    private rentals: Rental[] = [{
        id: "1",
        title: "Ext 2 room available.",
        surburb: "Cosmo city",
        city: "Johannesburg",
        street: "South Africa Road",
        category: "One Room and parking",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 1,
        description: "Please contact me for more infomation.",
        dailyRate: 1200,
        shared: true,
        createdAt: "06/03/2019"
      },
      {
        id: "2",
        title: "Cosmo city ext 6 room available.",
        surburb: "Cosmo city",
        city: "Johannesburg",
        street: "Dakar street",
        category: "One Room",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 1,
        description: "very nice room and at an affordable price. Please contact me for more infomation.",
        dailyRate: 1000,
        shared: false,
        createdAt: "18/02/2019"
      },
      {
        id: "3",
        title: "Ext 0 room available.",
        surburb: "Cosmo city",
        city: "Johannesburg",
        street: "New York street",
        category: "One Room and parking",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 1,
        description: "No charge for car parking. Please contact me for more infomation.",
        dailyRate: 1800,
        shared: false,
        createdAt: "22/01/2019"
      },
      {
        id: "4",
        title: "Extg 7 room available.",
        surburb: "Cosmo city",
        city: "Johannesburg",
        street: "Taiwan Cres",
        category: "One Room",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 1,
        description: "Please contact me for more infomation.",
        dailyRate: 1500,
        shared: true,
        createdAt: "15/02/2019"
      }
    ];

    public getRentalById(rentalId: string): Observable<Rental>{
      return new Observable<Rental>((observer) => {

        setTimeout(() => {
          const foundRental = this.rentals.find((rental) => {
            return rental.id == rentalId
          });

          observer.next(foundRental);
        },500);
      });
    }

    public getRentals(): Observable<Rental[]> {
        
        return new Observable<Rental[]>((observer) => {

            setTimeout(() => {
                
                observer.next(this.rentals);
            }, 1000);

            
        });
    }
}