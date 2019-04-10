import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'br-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private router: Router){

}

  ngOnInit() {
  }

  search(city: string){
    city ? this.router.navigate([`/rentals/${city}/homes`]) : this.router.navigate(['/rentals']);
}

}
