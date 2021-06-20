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
    path: "master",
    loadChildren: () => import('./master/master.module').then(m => m.MasterModule),
    canActivate: [AuthGuardService],
    //canLoad: [AuthGuardCanLoadService]
  },
  {
    path: "customer",
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuardService],
    //canLoad: [AuthGuardCanLoadService]
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