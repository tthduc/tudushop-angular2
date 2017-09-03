import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { UploadService } from '../../core/services/upload.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

export const UserRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    Daterangepicker,
    MultiselectDropdownModule,
    ModalModule.forRoot(),
    RouterModule.forChild(UserRoutes)
  ],
  providers: [UploadService],
  declarations: [UserComponent]
})
export class UserModule { }
