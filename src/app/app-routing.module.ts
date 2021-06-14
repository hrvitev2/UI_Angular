import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth.guard";
import { AuthGuardCanLoadService } from "./auth-guard-can-load.service";
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

  },
  {
    path: "dashboard",
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "department",
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "company",
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "gstcode",
    loadChildren: () => import('./gststate-codes/gststate-codes.module').then(m => m.GSTStateCodesModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "university",
    loadChildren: () => import('./university/university.module').then(m => m.UniversityModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "sac-code",
    loadChildren: () => import('./saccodes/saccodes.module').then(m => m.SaccodesModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "customer-type",
    loadChildren: () => import('./customer-type/customer-type.module').then(m => m.CustomerTypeModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "industry",
    loadChildren: () => import('./industry/industry.module').then(m => m.IndustryModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "leave-type",
    loadChildren: () => import('./leave-type/leave-type.module').then(m => m.LeaveTypeModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "tax-excemption",
    loadChildren: () => import('./tax-excemption/tax-excemption.module').then(m => m.TaxExcemptionModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "candidate-status",
    loadChildren: () => import('./rtsstatus/rtsstatus.module').then(m => m.RtsstatusModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "skill",
    loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "email-template",
    loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailtemplateModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "customer",
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuardService],
    // canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "**",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }