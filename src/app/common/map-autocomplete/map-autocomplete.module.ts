import { NgModule } from '@angular/core';
import { MapAutocompleteComponent } from './map-autocomplete.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MapAutocompleteComponent],
  exports: [MapAutocompleteComponent],
  imports: [
      CommonModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD6cyGbq4-lRr1p5bQlM1Uk0E9Disi4LEY',
        libraries: ['places']
      }),
  ],
  providers: []
})
export class MapAutocompleteModule { }