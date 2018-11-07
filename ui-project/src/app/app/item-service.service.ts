import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getItemList() {
    return this.http.get(`${this.baseUrl}/api/items`);
  }
}
