import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent,
  }
];

@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class RtsstatusModule { }
