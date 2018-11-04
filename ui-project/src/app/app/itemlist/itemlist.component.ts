import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

export const IMAGES: any[] = [
  ['/assets/images/large_Chicken_Biriyani.jpg',
  '/assets/images/large_Chicken_Biriyani.jpg',
  '/assets/images/large_Chicken_Biriyani.jpg'],
  ['/assets/images/veg-biryani-720x340.jpg',
  '/assets/images/veg-biryani-720x340.jpg',
  '/assets/images/veg-biryani-720x340.jpg']
];
@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
  providers: [NgbCarouselConfig]
})

export class ItemlistComponent implements OnInit {

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

}
