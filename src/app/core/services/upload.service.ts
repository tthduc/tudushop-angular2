import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UrlConstants } from '../../core/common/url.constant';
import { UtilityService } from './utility.service';
@Injectable()
export class UploadService {
  public responseData: any;
  constructor(private _dataService: DataService, private utilityService: UtilityService) { }

  /*
    1.postData : Dùng để chuyển dữ liệu lên
    2.files : Là 1 đối tượng để chứa danh sách các file
  */
  postWithFile(url: string, postData: any, files: File[]) {
    //KHởi tạo đối tượng FormData để chứa dữ liệu tổng hợp của 1 form (Bài 31)
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }

    //Khi upload thành công 
    //responseData trả ra url hình ảnh
    var returnReponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
          console.log(res);
          console.log(this.responseData);
        },
        error => this._dataService.handleError(error)
      );
    });
    return returnReponse;
  }
}
