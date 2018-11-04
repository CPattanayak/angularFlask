import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './app/register/register.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CustomerlistComponent } from './app/customerlist/customerlist.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from './app/update/update.component';
import { ItemlistComponent } from './app/itemlist/itemlist.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SidenavComponent,
    CustomerlistComponent,
    UpdateComponent,
    ItemlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
