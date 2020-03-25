import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadChangeParam, UploadFile} from "ng-zorro-antd";
import {ApiService} from "../Services/api.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-helb',
  templateUrl: './helb.component.html',
  styleUrls: ['./helb.component.css']
})
export class HELBComponent implements OnInit {

  constructor(private msg: NzMessageService, private api: ApiService, private http: HttpClient) {
  }

  sheduleTab:any =[[]];
  heures: number = 8;
  minutes: number = 0;
  heure = [];

  ngOnInit(): void {
    for (let i = 0; i < 45; i++) {
      if (this.minutes == 60) {
        this.heures++;
        this.minutes = 0;
      }
      this.heure.push("" + this.heures + ":" + this.minutes);
      this.minutes += 15;
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.msg.success(`${file.name} file uploaded successfully.`);
    this.api.getShedule(file.name).subscribe(
      data => {
        console.log(data);
        this.sheduleTab=data;
      },
      error => {

      });
    return false;
  };

}
