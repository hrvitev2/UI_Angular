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

const routes: Routes = [
];
@NgModule({
  declarations: [],
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
