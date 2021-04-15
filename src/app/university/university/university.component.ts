import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  lists: any;
  dialogRef: any;
  universityForm: FormGroup;
  universityEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'shortName', 'status', 'actions'];


  constructor(private http: HttpService, public dialog: MatDialog) {
    this.universityForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
    });

    this.universityEditForm = new FormGroup({
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
    this.http.getList('university').subscribe(
      (data: any) => {
        this.lists = data.data.rows;
        this.dataSource = new MatTableDataSource(this.lists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }


  addComp() {
    this.universityEditForm.reset();
    this.universityForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.universityForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('university', this.universityForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.universityForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.universityEditForm.controls.cId.setValue(i);
    for (let i = 0; i < this.lists.length; i++) {
      if (this.universityEditForm.value.cId == this.lists[i].id) {
        this.universityEditForm.controls.name.setValue(this.lists[i].name);
        this.universityEditForm.controls.shortName.setValue(this.lists[i].shortName);
        this.universityEditForm.controls.status.setValue(this.lists[i].status);
        this.universityEditForm.controls.note.setValue(this.lists[i].note);
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
    this.http.update('university', this.universityEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.universityEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

}
