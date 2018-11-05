import { Component, OnInit , Input , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() selectedPrice = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  emitPrice()
  {
    this.selectedPrice.emit(this.selectedItem.price);
  }

}
