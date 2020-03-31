import {Component, OnInit} from '@angular/core';
import {ItemData} from '../item-data';
import {ApiService} from '../Services/api.service';

@Component({
  selector: 'app-cvap',
  templateUrl: './cvap.component.html',
  styleUrls: ['./cvap.component.css']
})
export class CVAPComponent implements OnInit {
  Chiffre = 1;
  titre = 'Quadrimestre';
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: any = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor(private api: ApiService) {
  }

  refreshStatus(): void {
    // verifie si toutes les case sont coché en parcourant le tableau de boolean mapOfCheckedId, si oui il va retrouner true
    // pour que le nzChecked du coté html mette toutes les cases en mode coché
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    // la même chose, vérifie si au moins une case est coché avec some et si oui alors met partiellement coché
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    // le tableau mapOfCheckedId est un tableau de boolean pour dire si une case est coché où pas
    // une fois qu'on appuie sur le button pour tout coché, il va parcourir ce tableau pour le remplir de true
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  ngOnInit(): void {
    this.titre = 'Quadrimestre ' + this.Chiffre;
  }


  ButtonChange(leQuadri: number) {
    this.Chiffre = leQuadri;
    this.titre = 'Quadrimestre ' + this.Chiffre;
    this.api.getAllCourses(this.Chiffre).subscribe(
      data => {
        console.log(data);
        this.listOfAllData = data;
        console.log(this.listOfAllData);
      });
  }
}
