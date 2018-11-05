import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

export const IMAGES: any[] = [
  [{'imageUrl': '/assets/images/large_Chicken_Biriyani.jpg', 'price': 10},
   {'imageUrl': '/assets/images/large_Chicken_Biriyani.jpg', 'price': 20},
   {'imageUrl': '/assets/images/large_Chicken_Biriyani.jpg', 'price': 30}],
  [{'imageUrl': '/assets/images/veg-biryani-720x340.jpg', 'price': 40},
   {'imageUrl': '/assets/images/veg-biryani-720x340.jpg', 'price': 50},
   {'imageUrl': '/assets/images/veg-biryani-720x340.jpg', 'price': 60}]
];
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
  providers: [NgbCarouselConfig]
})

export class ItemlistComponent implements OnInit {
  totalPrice = 0;
  showNavigationArrows = true;
  showNavigationIndicators = false;
  images = [1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  imageBundel: any[];
  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.imageBundel = IMAGES.filter(image => image);
  }
  addPrice(price: number)
  {
    this.totalPrice = this.totalPrice + price;
    alert(this.totalPrice);
  }
}
