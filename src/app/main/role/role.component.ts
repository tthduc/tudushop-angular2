import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constant';
import { Response } from '@angular/http';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public roles: any = [];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter + '')
      .subscribe((respone: any) => {
        this.roles = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRow = respone.TotalRows;
        console.log(respone);
      });
  }

  loadRole(id: any) {
    this._dataService.get('/api/appRole/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
        console.log(respone);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadRole(id)
    this.modalAddEdit.show();
    console.log(this.loadRole(id));
  }

  deleteRole(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteRoleComfirm(id));
  }
  //Bởi vì khi truyền 1 id vào function khác thì nó không nhận bắt buộc phải viết 2 function
  deleteRoleComfirm(id: any) {
    this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    });
  }
  saveChanged(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appRole/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/appRole/update', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }
}
