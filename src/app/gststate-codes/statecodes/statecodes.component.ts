import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-statecodes',
  templateUrl: './statecodes.component.html',
  styleUrls: ['./statecodes.component.css']
})
export class StatecodesComponent implements OnInit {

  codeList: any;
  dialogRef: any;
  codeForm: FormGroup;
  codeEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'code', 'shortCode', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.codeForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'code': new FormControl("", Validators.required),
      'shortCode': new FormControl("", Validators.required)
    });

    this.codeEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'code': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'gstId': new FormControl("", Validators.required),
      'shortCode': new FormControl("", Validators.required)
    });

  }


  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('gst').subscribe(
      (data: any) => {
        this.codeList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.codeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }


  addComp() {
    this.codeEditForm.reset();
    this.codeForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.codeForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('gst', this.codeForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.codeForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.codeEditForm.controls.gstId.setValue(i);
    for (let i = 0; i < this.codeList.length; i++) {
      if (this.codeEditForm.value.gstId == this.codeList[i].id) {
        this.codeEditForm.controls.name.setValue(this.codeList[i].name);
        this.codeEditForm.controls.code.setValue(this.codeList[i].code);
        this.codeEditForm.controls.shortCode.setValue(this.codeList[i].shortCode);
        this.codeEditForm.controls.status.setValue(this.codeList[i].status);
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
    this.http.update('gst', this.codeEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.codeEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

}
