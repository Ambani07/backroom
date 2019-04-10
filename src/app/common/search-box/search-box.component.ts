/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'br-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  private address: any[] = [];
  private city : string = "";

  isActiveInput: boolean = false;

  @ViewChild('search')
  private searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    //set google maps defaults

    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //set current position
this.setCurrentPosition();

 //load Places Autocomplete
 this.mapsAPILoader.load().then(() => {
  let autocomplete = new window['google'].maps.places.Autocomplete(this.searchElement.nativeElement, {
    componentRestrictions: { country: 'ZA' }
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }
      
      //set latitude and longitude
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.search(place);
    });
  });
});
}

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }
}

  search(data: Object){
    this.address = data['formatted_address'].split(", ");
    this.city = this.address[0];
    console.log(this.address);

    this.city ? this.router.navigate([`/rentals/${this.city}/homes`]) : this.router.navigate(['/rentals']);
  }

  // searchNotComplete(city: string){
  //   this.city ? this.router.navigate([`/rentals/${city}/homes`]) : this.router.navigate(['/rentals']);
  // }

}
