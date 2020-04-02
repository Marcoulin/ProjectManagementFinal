import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-horaire',
  templateUrl: './table-horaire.component.html',
  styleUrls: ['./table-horaire.component.css']
})
export class TableHoraireComponent implements OnInit {
  constructor() {
  }

  heures: number=8;
  minutes: number=0;
  heure = [];
  ngOnInit(): void {
    for (let i = 0; i < 45; i++) {
      if (this.minutes == 60) {
        this.heures++;
        this.minutes = 0;
      }
      if(this.minutes+15==60){
      this.heure.push(""+this.heures+":"+this.minutes+"h - "+(this.heures+1)+"h");
      }else{
      this.heure.push(""+this.heures+":"+this.minutes+"h - "+this.heures+":"+(this.minutes+15)+"h");
      }
      this.minutes+=15;
      //coucou salut tlm
    }
  }


}
