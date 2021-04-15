import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInItems } from '@angular/material/menu';
 
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  editId: any;
  deptList: any;
  dialogRef: any;
  deptForm: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getDepartmentList();
  }


  constructor(private http: HttpService, public dialog: MatDialog) {
    this.deptForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartmentList() {
    this.http.getDepartmentList().subscribe(
      (data: any) => {
        this.deptList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.deptList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  addDept() {
    this.editId = null;
    this.deptForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);

    this.dialogRef.afterClosed().subscribe(result => {
    });
    
  }


  add() {

    if (this.editId) {
      this.update();
      return false;
    }

    if (this.deptForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }

    this.http.addDept(this.deptForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getDepartmentList();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.editId = i;
    for (let i = 0; i < this.deptList.length; i++) {
      if (this.editId == this.deptList[i].id) {
        this.deptForm.controls.name.setValue(this.deptList[i].name);
        this.dialogRef = this.dialog.open(this.templateRef);
      }
    }
  }

  update() {
    let body = { "dId": this.editId, "name": this.deptForm.value.name }
    this.http.updateDept(body).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.editId = null;
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }
}
