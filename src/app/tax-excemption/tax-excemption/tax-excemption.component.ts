import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tax-excemption',
  templateUrl: './tax-excemption.component.html',
  styleUrls: ['./tax-excemption.component.css']
})
export class TaxExcemptionComponent implements OnInit {
  taxList: any;
  dialogRef: any;
  taxForm: FormGroup;
  taxEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['from', 'to', 'percentage', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.taxForm = new FormGroup({
      'from': new FormControl("", Validators.required),
      'to': new FormControl("", Validators.required),
      'percentage': new FormControl("", Validators.required)
    });

    this.taxEditForm = new FormGroup({
      'from': new FormControl("", Validators.required),
      'to': new FormControl("", Validators.required),
      'percentage': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'tId': new FormControl("", Validators.required),
    });

  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('tax').subscribe(
      (data: any) => {
        this.taxList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.taxList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }


  addComp() {
    this.taxEditForm.reset();
    this.taxForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.taxForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('tax', this.taxForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.taxForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.taxEditForm.controls.tId.setValue(i);
    for (let i = 0; i < this.taxList.length; i++) {
      if (this.taxEditForm.value.tId == this.taxList[i].id) {
        this.taxEditForm.controls.from.setValue(this.taxList[i].from);
        this.taxEditForm.controls.to.setValue(this.taxList[i].to);
        this.taxEditForm.controls.percentage.setValue(this.taxList[i].percentage);
        this.taxEditForm.controls.status.setValue(this.taxList[i].status);
        this.dialogRef = this.dialog.open(this.templateRef);
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update() {
    if (this.taxForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.update('tax', this.taxEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.taxEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }
}
