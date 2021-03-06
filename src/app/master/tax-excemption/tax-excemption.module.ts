import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxExcemptionComponent } from './tax-excemption/tax-excemption.component';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: TaxExcemptionComponent,
  }
];


@NgModule({
  declarations: [TaxExcemptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class TaxExcemptionModule { }
