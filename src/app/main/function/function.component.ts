import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constant';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  //Một cách khác để tương tác với model
  @ViewChild(TreeComponent)

  private treeFunction: TreeComponent;
  public _functionHierachy: any[];
  public _function: any[];
  public entity: any;
  public editFlag: boolean; //Kiểm tra trạng thái khi popup bật lên là thêm hay sữa
  public filter: string = '';
  public functionId: string;
  public _permission: any[];
  constructor(private _utilityService: UtilityService, private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  //Load Data
  public loadData() {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._function = response.filter(x => x.ParentId == null);
        this._functionHierachy = this._utilityService.Unflatten(response);
      }, error => this._dataService.handleError(error));
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
    this.editFlag = false;
  }

  showEditPermission(id: any) {
    this._dataService.get('/api/appRole/getAllPermission?functionId=' + id)
      .subscribe((response: any[]) => {
        this.functionId = id;
        this._permission = response;
        this.permissionModal.show();
        console.log(response);
      }, error => this._dataService.handleError(error));
  }

  public savePermission(valid: boolean, _permission: any[]) {
    if(valid){
      var data = {
        Permissions : this._permission,
        FunctionId : this.functionId
      }
      this._dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        this.permissionModal.hide();
      },error=>this._dataService.handleError(error));
    }
  }

  showEditModal(id: any) {
    this._dataService.get('/api/function/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
        this.editFlag = true;
        this.modalAddEdit.show();
      }, error => this._dataService.handleError(error));
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteItemComfirm(id));
  }
  //Bởi vì khi truyền 1 id vào function khác thì nó không nhận bắt buộc phải viết 2 function
  deleteItemComfirm(id: any) {
    this._dataService.delete('/api/function/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    });
  }

  saveChanged(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('/api/function/add', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/function/update', JSON.stringify(this.entity))
          .subscribe((respone: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }
}
