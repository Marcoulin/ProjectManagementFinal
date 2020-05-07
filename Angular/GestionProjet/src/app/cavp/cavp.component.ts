import {Component, OnInit} from '@angular/core';
import {ApiService} from '../Services/api.service';

@Component({
  selector: 'app-cvap',
  templateUrl: './cavp.component.html',
  styleUrls: ['./cavp.component.css'],
})
export class CavpComponent implements OnInit {
  // ue1 = ['Méthodologies et outils des apprentissages', 'Droit et éthique', 'Technique de présentation orale et écrite'];
  // quadrimestres = ['Quadrimestre 1', 'Quadrimestre 2', 'Quadrimestre 3', 'Quadrimestre 4', 'Quadrimestre5', 'Quadrimestre 6'];
  // Quadri1ECTS = ['5', '6', '15', '2', '2'];

  constructor(private api: ApiService) {
  }

  mapOfExpandData: { [key: string]: boolean } = {};
  mapOfExpandData2: { [key: string]: boolean } = {};
  tab: any[][] = [];
  qqch: any = [];
  dataList: any = [];
  isVisible = false;
  checkedTab: string[] = [];
  overlapTab: string[] = [];
  isCorrect = false;

  ngOnInit(): void {
    this.initialisationTab()
  }

  initialisationTab() {
    this.api.getUeFromDB().subscribe(data => {
      //console.log(data);
      this.dataList = data;
      for (const items of this.dataList) {
        for (const item of items) {
          this.qqch.push([item.nom_ue, item.quadrimestre_ue, item.nombre_heure_ue, item.nombre_credit_ue])
        }
        this.tab.push(this.qqch);
        this.qqch = [];
      }
    });
    this.dataList = this.tab;
  }

  showModal(): void {
    this.api.checkCoursesOverlap(this.checkedTab).subscribe((data: string[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
          console.log(data[i][3] + "et voici le deuxième " + data[j][3]);
          if (data[i][4] != data[j][4] && data[i][3] === data[j][3] && this.isHoursOverLaping(data[i][1], data[i][2], data[j][1], data[j][2])) {
            const phrase: string = "le cours de " + data[i][0] + " et le cours de " + data[j][0] + " se chevauchent le " + data[i][3] + " entre " + data[i][1] + " et " + data[i][2];
            if (!this.overlapTab.includes(phrase)) {
              this.overlapTab.push(phrase);
            }
          }
        }
      }
      this.isCorrect = (this.overlapTab.length == 0);
      if (this.isCorrect) {
        this.overlapTab.push("TOUT EST OK");
      }
      this.isVisible = true;
    });
  }

  handleOk(): void {
    this.overlapTab = [];
    this.isVisible = false;
  }

  handleCancel() {
    this.overlapTab = [];
    this.isVisible = false;
  }


  log($event: string[]) {
    this.checkedTab = $event;
    console.log(this.checkedTab)
  }

  private isHoursOverLaping(stringElement: string, stringElement1: string, stringElement2: string, stringElement3: string): boolean {
    const heure_debut_coursOne = this.hoursExtract(stringElement);
    const heure_fin_coursOne = this.hoursExtract(stringElement1);
    const heure_debut_coursTwo = this.hoursExtract(stringElement2);
    const heure_fin_coursTwo = this.hoursExtract(stringElement3);

    if (heure_debut_coursTwo == heure_debut_coursOne || heure_fin_coursTwo == heure_fin_coursOne || (heure_debut_coursTwo >= heure_debut_coursOne && heure_debut_coursTwo < heure_fin_coursOne) || (heure_fin_coursTwo > heure_debut_coursOne && heure_fin_coursTwo <= heure_fin_coursOne)) {
      return true;
    }
    return false;
  }

  private hoursExtract(heure: string): number {
    heure = heure.substring(0, 2);
    if (heure[0] == "0") {
      heure = heure[1];
    }
    //console.log(heure);
    return Number(heure);
  }
}


