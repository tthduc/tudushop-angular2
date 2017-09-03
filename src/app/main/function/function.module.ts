import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { Daterangepicker } from 'ng2-daterangepicker';

export const FunctionRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: FunctionComponent }
]
@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    TreeModule,
    Daterangepicker,
    RouterModule.forChild(FunctionRoutes)
  ],
  providers:[],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
