import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../data-sharing.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  durationInSeconds = 5;

  constructor(private router: Router, private Auth: AuthService, private dataSharingService: DataSharingService, private _snackBar: MatSnackBar, private toastr: ToastrService) {

    this.loginForm = new FormGroup({
      'username': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required),
    });

  }

  ngOnInit(): void {
    if (this.Auth.CheckLoginStatus) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {

    if (this.loginForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }

    this.Auth.login(this.loginForm.value).subscribe(
      (data: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('userToken', data.token);

        this.router.navigate(['/dashboard']);
        window.location.reload();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      }
    )
  }


} 