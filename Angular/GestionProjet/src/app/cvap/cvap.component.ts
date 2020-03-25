import { Component, OnInit } from '@angular/core';
import {ItemData} from "../item-data";

@Component({
  selector: 'app-cvap',
  templateUrl: './cvap.component.html',
  styleUrls: ['./cvap.component.css']
})
export class CVAPComponent implements OnInit {
  Chiffre:number=1;
  titre:string ="Quadrimestre";
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  currentPageDataChange($event: ItemData[]): void {
    this.titre=`Quadrimestre ${this.Chiffre}`;
    this.listOfDisplayData = $event;
    console.log($event);
    this.refreshStatus();
  }

  refreshStatus(): void {
    // verifie si toutes les case sont coché en parcourant le tableau de boolean mapOfCheckedId, si oui il va retrouner true
    // pour que le nzChecked du coté html mette toutes les cases en mode coché
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    //la même chose, vérifie si au moins une case est coché avec some et si oui alors met partiellement coché
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    //le tableau mapOfCheckedId est un tableau de boolean pour dire si une case est coché où pas
    // une fois qu'on appuie sur le button pour tout coché, il va parcourir ce tableau pour le remplir de true
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 0; i < 60; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }


}
