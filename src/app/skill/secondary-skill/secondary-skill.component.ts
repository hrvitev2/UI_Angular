import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-secondary-skill',
  templateUrl: './secondary-skill.component.html',
  styleUrls: ['./secondary-skill.component.css']
})
export class SecondarySkillComponent implements OnInit {

  skillList: any;
  secSkillList: any;
  dialogRef: any;
  skillForm: FormGroup;
  skillEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'skill', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.skillForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'skillId': new FormControl("", Validators.required),
    });

    this.skillEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'skillId': new FormControl("", Validators.required),
      'sId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }


  ngOnInit(): void {
    this.getList();
  }

  getSkillList() {
    this.http.getList('skill').subscribe(
      (data: any) => {
        this.secSkillList = data.data.rows;
        for (let i = 0; i < this.secSkillList.length; i++) {
          for (let j = 0; j < this.skillList.length; j++) {
            if (this.secSkillList[i].id == this.skillList[j].skillId) {
              this.skillList[j].skill = this.secSkillList[i].name;
            }
          }
        }

        this.dataSource = new MatTableDataSource(this.skillList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  getList() {
    this.http.getList('skill-2').subscribe(
      (data: any) => {
        this.getSkillList();
        this.skillList = data.data.rows;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  addComp() {
    this.skillEditForm.reset();
    this.skillForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    this.skillForm.controls.skillId.setValue(this.skillForm.value.skillId.toString());
    if (this.skillForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('skill-2', this.skillForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.skillForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.skillEditForm.controls.sId.setValue(i);
    for (let i = 0; i < this.skillList.length; i++) {
      if (this.skillEditForm.value.sId == this.skillList[i].id) {
        this.skillEditForm.controls.name.setValue(this.skillList[i].name);
        this.skillEditForm.controls.skillId.setValue(this.skillList[i].skillId);
        this.skillEditForm.controls.status.setValue(this.skillList[i].status);
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
    this.skillEditForm.controls.skillId.setValue(this.skillEditForm.value.skillId.toString());
    this.http.update('skill-2', this.skillEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.skillEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }
}
