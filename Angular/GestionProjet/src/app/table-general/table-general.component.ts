import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ApiService} from '../Services/api.service';
import {HttpClient} from '@angular/common/http';
import {ItemData} from '../item-data';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.css']
})
export class TableGeneralComponent implements OnInit {
  sheduleTab: any = [[]];
  Chiffre = 1;

  constructor(private msg: NzMessageService, private api: ApiService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.msg.success(`${file.name} file uploaded successfully.`);
    this.api.getShedule(file.name).subscribe(
      data => {
        console.log(data);
        this.sheduleTab = data;
      },
      error => {
      });
    return false;
  };

  currentPageDataChange($event: ItemData[]): void {
    console.log($event);
  }

}
