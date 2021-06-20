import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./department/Department.module').then(m => m.DepartmentModule)
  },
  {
    path: "department",
    loadChildren: () => import('./department/Department.module').then(m => m.DepartmentModule)
  },
  {
    path: "company",
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),

  },
  {
    path: "gstcode",
    loadChildren: () => import('./gststate-codes/gststate-codes.module').then(m => m.GSTStateCodesModule),

  },
  {
    path: "university",
    loadChildren: () => import('./university/university.module').then(m => m.UniversityModule),

  },
  {
    path: "sac-code",
    loadChildren: () => import('./saccodes/saccodes.module').then(m => m.SaccodesModule),

  },
  {
    path: "customer-type",
    loadChildren: () => import('./customer-type/customer-type.module').then(m => m.CustomerTypeModule),

  },
  {
    path: "industry",
    loadChildren: () => import('./industry/industry.module').then(m => m.IndustryModule),

  },
  {
    path: "leave-type",
    loadChildren: () => import('./leave-type/leave-type.module').then(m => m.LeaveTypeModule),

  },
  {
    path: "tax-excemption",
    loadChildren: () => import('./tax-excemption/tax-excemption.module').then(m => m.TaxExcemptionModule),

  },
  {
    path: "candidate-status",
    loadChildren: () => import('./rtsstatus/rtsstatus.module').then(m => m.RtsstatusModule),

  },
  {
    path: "skill",
    loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule),

  },
  {
    path: "email-template",
    loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailtemplateModule),

  },
  {
    path: "customer",
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),

  }
];



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
export class MasterModule { }
