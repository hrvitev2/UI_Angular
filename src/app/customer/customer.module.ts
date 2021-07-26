import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "settings",
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: "clients",
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: "projects",
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
