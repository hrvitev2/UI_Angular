import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { DepartmentComponent } from './department/department.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { NoticePeriodComponent } from './notice-period/notice-period.component';
import { PayrollComponent } from './payroll/payroll.component';
import { SalaryBreakupsComponent } from './salary-breakups/salary-breakups.component';
import { StatutoryComponent } from './statutory/statutory.component';
import { TaManagementComponent } from './ta-management/ta-management.component';
import { DesignationsComponent } from './designations/designations.component';
import { EmpIdComponent } from './emp-id/emp-id.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




//FORMS
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { PayslipBreakupsComponent } from './payslip-breakups/payslip-breakups.component';
import { LeaveComponent } from './leave/leave.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'leave-management',
    component: LeaveManagementComponent,
  },
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'attendance-management',
    component: AttendanceManagementComponent,
  },
  {
    path: 'notice-period',
    component: NoticePeriodComponent,
  },
  {
    path: 'payroll',
    component: PayrollComponent,
  },
  {
    path: 'salary-breakups',
    component: SalaryBreakupsComponent,
  },
  {
    path: 'payslip-breakups',
    component: PayslipBreakupsComponent,
  },
  {
    path: 'statutory',
    component: StatutoryComponent,
  },
  {
    path: 'ta-management',
    component: TaManagementComponent,
  },
  {
    path: 'designation',
    component: DesignationsComponent,
  },
  {
    path: 'emp-id',
    component: EmpIdComponent,
  },
  {
    path: 'holiday',
    component: LeaveComponent,
  }
];


@NgModule({
  declarations: [
    ProfileComponent,
    LeaveManagementComponent,
    DepartmentComponent,
    AttendanceManagementComponent,
    NoticePeriodComponent,
    PayrollComponent,
    SalaryBreakupsComponent,
    StatutoryComponent,
    TaManagementComponent,
    DesignationsComponent,
    EmpIdComponent,
    PayslipBreakupsComponent,
    LeaveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, MatNativeDateModule,
    AngularMaterialModule, NgxMatFileInputModule, MatSlideToggleModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    LeaveManagementComponent,
    DepartmentComponent,
    AttendanceManagementComponent,
    NoticePeriodComponent,
    PayrollComponent,
    SalaryBreakupsComponent,
    StatutoryComponent,
    TaManagementComponent,
    DesignationsComponent,
    EmpIdComponent, LeaveComponent, PayslipBreakupsComponent]
})
export class SettingModule { }
