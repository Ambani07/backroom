import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';

import { CamelizePipe } from 'ngx-pipes';

import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD6cyGbq4-lRr1p5bQlM1Uk0E9Disi4LEY'
      }),
      CommonModule
  ],
  providers: [
      MapService,
      CamelizePipe
    ]
})
export class MapModule { }
