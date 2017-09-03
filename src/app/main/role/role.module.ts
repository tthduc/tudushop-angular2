import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
export const RoleRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule,
    RouterModule.forChild(RoleRoutes)
  ],
  providers: [DataService, NotificationService],
  declarations: [RoleComponent]
})
export class RoleModule { }
