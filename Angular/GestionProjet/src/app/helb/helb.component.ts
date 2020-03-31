import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../Services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-helb',
  templateUrl: './helb.component.html',
  styleUrls: ['./helb.component.css']
})
export class HELBComponent implements OnInit {

  sheduleTab: any = [[]];

  constructor(private msg: NzMessageService, private api: ApiService, private http: HttpClient) {
  }

  ngOnInit(): void {
    /*
      for (let i = 0; i < 45; i++) {
        if (this.minutes == 60) {
          this.heures++;
          this.minutes = 0;
        }
        this.heure.push("" + this.heures + ":" + this.minutes);
        this.minutes += 15;
      }

      */
  }

// remplissage du tableau apres le depot


// traitement pour les cases vides


}
