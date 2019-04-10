import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
  imports: [
      CommonModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD6cyGbq4-lRr1p5bQlM1Uk0E9Disi4LEY',
        libraries: ['places']
      }),
  ],
  providers: []
})
export class SearchBoxModule { }