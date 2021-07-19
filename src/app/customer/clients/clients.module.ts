import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Modules
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { ChangeStatusComponent } from './change-status/change-status.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'view/:id',
    component: ViewComponent,
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
  },
  {
    path: 'changeStatus/:id',
    component: ChangeStatusComponent
  },
  {
    path: 'delete/:id',
    component: ChangeStatusComponent
  }
];
@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    ViewComponent,
    ListComponent,
    ChangeStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, NgxMaterialTimepickerModule,
    CommonModule, MatNativeDateModule,
    AngularMaterialModule, NgxMatFileInputModule, MatSlideToggleModule,
    RouterModule.forChild(routes)
  ], entryComponents: [

  ]
}
)
export class ClientsModule { }
