import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

const routes: Routes = [
  {
    path: '',
    component: CustomerTypeComponent,
  }
];

@NgModule({
  declarations: [CustomerTypeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerTypeModule { }
