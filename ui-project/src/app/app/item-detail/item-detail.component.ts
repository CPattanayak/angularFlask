import { Component, OnInit , Input , EventEmitter, Output} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() selectedPrice = new EventEmitter<number>();
  private baseUrl = environment.baseUrl;
  public imageUrl: string;
  constructor() { }

  ngOnInit() {
    this.imageUrl = `http://localhost:5000/image/${this.selectedItem.imageName}`;
  }

  emitPrice()
  {
    this.selectedPrice.emit(this.selectedItem.price);
  }

}
