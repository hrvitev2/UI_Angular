import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  industryList: any;
  dialogRef: any;
  statusForm: FormGroup;
  statusEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.statusForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });

    this.statusEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'rtsId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }



  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('rtsstatus').subscribe(
      (data: any) => {
        this.industryList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.industryList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  addComp() {
    this.statusEditForm.reset();
    this.statusForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    if (this.statusForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('rtsstatus', this.statusForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.statusForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.statusEditForm.controls.rtsId.setValue(i);
    for (let i = 0; i < this.industryList.length; i++) {
      if (this.statusEditForm.value.rtsId == this.industryList[i].id) {
        this.statusEditForm.controls.name.setValue(this.industryList[i].name);
        this.statusEditForm.controls.status.setValue(this.industryList[i].status);
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
    this.http.update('rtsstatus', this.statusEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.statusEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

}
