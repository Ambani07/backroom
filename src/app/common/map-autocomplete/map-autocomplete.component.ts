/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'br-map-autocomplete',
  templateUrl: './map-autocomplete.component.html',
  styleUrls: ['./map-autocomplete.component.scss']
})
export class MapAutocompleteComponent implements OnInit {
  public latitude: number;
  public longitude: number;

  @Input() entity: any;

  @Input() field: string;

  @Output() setAddress: EventEmitter<any> = new EventEmitter();

  isActiveInput: boolean = false;

  @ViewChild('search')
  private searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
        //set google maps defaults

        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
    this.setCurrentPosition();

     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      let autocomplete = new window['google'].maps.places.Autocomplete(this.searchElement.nativeElement, {
        componentRestrictions: { country: 'ZA' },
        types: ["address"]
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
          this.invokeEvent(place);
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

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
