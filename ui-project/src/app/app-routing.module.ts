import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './app/register/register.component';
import {CustomerlistComponent} from './app/customerlist/customerlist.component';
import {UpdateComponent} from './app/update/update.component';
import {ItemlistComponent} from './app/itemlist/itemlist.component'

const routes: Routes = [
  { path: 'newuser',      component: RegisterComponent},
  { path: 'customerList',      component: CustomerlistComponent},
  { path: 'updateUser',      component: UpdateComponent},
  { path: 'itemList', component: ItemlistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
