import { Component, OnInit } from '@angular/core';
import {ItemServiceService} from '../item-service.service';
import { UpdateItemsComponent } from '../update-items/update-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemServiceService]
})
export class ItemsComponent implements OnInit {
  items: any[];
  constructor(private itemService: ItemServiceService,private modalService: NgbModal) { }

  ngOnInit() {
    this.itemService.getItemListAdmin().subscribe(
      data => {
         this.items = data['items'].filter( item => item);
      }
    );
  }
  openFormModal() {
    const modalRef = this.modalService.open(UpdateItemsComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
