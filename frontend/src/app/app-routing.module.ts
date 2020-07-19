import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { ConverterComponent } from './views/converter/converter.component'

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path:"converter",
    component: ConverterComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
