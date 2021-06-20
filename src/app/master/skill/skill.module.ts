import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillComponent } from './skill/skill.component';
import { SecondarySkillComponent } from './secondary-skill/secondary-skill.component';
import { Routes, RouterModule } from '@angular/router';

//FORMS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';

const routes: Routes = [
  {
    path: '',
    component: SkillComponent,
  },
  {
    path: 'secondary',
    component: SecondarySkillComponent,
  }
];


@NgModule({
  declarations: [SkillComponent, SecondarySkillComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [SecondarySkillComponent]
})
export class SkillModule { }
