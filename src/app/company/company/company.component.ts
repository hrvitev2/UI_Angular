import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  compList: any;
  dialogRef: any;
  companyForm: FormGroup;
  companyEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'shortName', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.companyForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
    });

    this.companyEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'note': new FormControl("", Validators.required),
      'cId': new FormControl("", Validators.required),
    });

  }


  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('comp').subscribe(
      (data: any) => {
        this.compList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.compList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }


  addComp() {
    this.companyEditForm.reset();
    this.companyForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.companyEditForm.value.cId) {
      this.update();
      return false;
    }
    if (this.companyForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('comp', this.companyForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.companyForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.companyEditForm.controls.cId.setValue(i);
    for (let i = 0; i < this.compList.length; i++) {
      if (this.companyEditForm.value.cId == this.compList[i].id) {
        this.companyEditForm.controls.name.setValue(this.compList[i].name);
        this.companyEditForm.controls.shortName.setValue(this.compList[i].shortName);
        this.companyEditForm.controls.status.setValue(this.compList[i].status);
        this.companyEditForm.controls.note.setValue(this.compList[i].note);
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
    this.http.update('comp',this.companyEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.companyEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

}
