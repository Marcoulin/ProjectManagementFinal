import {Component, OnInit} from '@angular/core';
import {ApiService} from "../Services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nbHours: number = 0;
  nbCredits: number = 0;
  CoursTab: any = []

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.nbCredits = this.api.nombrecredit;
    //this.api.getSpecificSchedule().subscribe((data)=>console.log("effectivement"));
    this.api.gettingCourseList().subscribe((data) => {
      console.log(data);
      this.CoursTab = data;
    });
    this.api.gettingHoursCredits().subscribe((data: number) => this.nbHours = data);
  }
}
