import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ItemModel } from '../item.model';
import {ItemServiceService} from '../item-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  itemForm: FormGroup;
  item: ItemModel = new ItemModel();
  submitted = false;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }


  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
    this.initialize();
  }
  populateItem() {
    this.item.avalibility = true;
    this.item.imageName = this.itemForm.get('imageName').value;
    this.item.itemName = this.itemForm.get('itemName').value;
    this.item.price = this.itemForm.get('price').value;
   }
  initialize() {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      price: ['', Validators.required],
      imageName: ['', [Validators.required]]
  });
  }
   // convenience getter for easy access to form fields
   get f() { return this.itemForm.controls; }

   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.itemForm.invalid) {
        return;
    }

}
}
