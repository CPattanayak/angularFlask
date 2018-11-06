import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';
const URL = 'http://localhost:5000/api/uploaddb';
@Component({
  selector: 'app-fileloader',
  templateUrl: './fileloader.component.html',
  styleUrls: ['./fileloader.component.css']
})
export class FileloaderComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
        // alert('File uploaded successfully');
     };
 }
}
