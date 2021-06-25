import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService } from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ta-management',
  templateUrl: './ta-management.component.html',
  styleUrls: ['./ta-management.component.css']
})
export class TaManagementComponent implements OnInit {

  searchKey: string;
  editId: any;
  lists: any;
  dialogRef: any;
  forms: FormGroup;
  closeJobAfter: boolean = false;
  unAssignJobEMPAfter: boolean = false;
  unAssignJobVendorAfter: boolean = false;


  ngOnInit(): void {
    this.getList();
  }


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'id': new FormControl(""),
      'closeJobAfter': new FormControl("", Validators.required),
      'unAssignJobEMPAfter': new FormControl("", Validators.required),
      'unAssignJobVendorAfter': new FormControl("", Validators.required),
      'status': new FormControl('a'),
    });

  }

  getList() {
    this.http.getViewCustomer('ta-management').subscribe(
      (data: any) => {
        this.lists = data.data;
        this.forms.controls.id.setValue(this.lists.id.toString());
        this.forms.controls.closeJobAfter.setValue(this.lists.closeJobAfter);
        this.forms.controls.unAssignJobEMPAfter.setValue(this.lists.unAssignJobEMPAfter);
        this.forms.controls.unAssignJobVendorAfter.setValue(this.lists.unAssignJobVendorAfter);
        this.forms.controls.status.setValue(this.lists.status);

        if (this.lists.closeJobAfter) {
          this.closeJobAfter = true;
        }

        if (this.lists.unAssignJobEMPAfter) {
          this.unAssignJobEMPAfter = true;
        }

        if (this.lists.unAssignJobVendorAfter) {
          this.unAssignJobVendorAfter = true;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  add() {

    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    let body = this.forms.value;

    this.http.addDataCustomer('ta', body).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  convertBoolean(val) {
    if (val) {
      return "1";
    } else {
      return "0";
    }
  }

}
