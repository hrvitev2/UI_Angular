import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { AddComponent } from './add/add.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
  {
    path: 'add/:id',
    component: AddComponent,
  },
  {
    path: 'view/:id',
    component: ViewComponent,
  }
];




@NgModule({
  declarations: [
    CustomerComponent,
    AddComponent,
    ViewComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    NgxMatFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [AddComponent, ViewComponent]
})
export class CustomerModule { }
