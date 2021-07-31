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
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

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
    path: 'update/:id',
    component: UpdateComponent,
  }
];
@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, NgxMaterialTimepickerModule,
    CommonModule, MatNativeDateModule,
    AngularMaterialModule, NgxMatFileInputModule, MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectsModule { }
