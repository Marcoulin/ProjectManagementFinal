import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-cvap',
  templateUrl: './cavp.component.html',
  styleUrls: ['./cavp.component.css'],
})
export class CavpComponent{
  ue1 = ['Méthodologies et outils des apprentissages', 'Droit et éthique', 'Technique de présentation orale et écrite'];
  quadrimestres = ['Quadrimestre 1', 'Quadrimestre 2', 'Quadrimestre 3', 'Quadrimestre 4', 'Quadrimestre5', 'Quadrimestre 6']
  Quadri1ECTS = ['5', '6', '15', '2', '2'];

  mapOfExpandData: {[key: string]: boolean} = {}
  mapOfExpandData2: {[key: string]: boolean} = {}
  dataList = [
    {
      id: 1,
      Quadrimestre: 'Quadrimestre 1',
      matieres: [
        {
          key: 1,
          ects: 5,
          ue: 'UE 1-1 INTEGRATION DANS L\'ENSEIGNEMENT SUPERIEUR',
          totalHours: 50,
        },
        {
          key: 2,
          ects: 6,
          ue: 'UE 1-2 ARCHITECTURE ET TECHNOLOGIES DES ORDINATEURS',
          totalHours: 91
        },
        {
          key: 3,
          ects: 15,
          ue: 'UE 1-3 PROGRAMMATION I',
          totalHours: 182
        },
        {
          key: 4,
          ects: 2,
          ue: 'UE 1-4 ELEMENTS DE COMPTABILITE GENERALE',
          totalHours: 39
        },
        {
          key: 5,
          ects: 2,
          ue: 'UE 1-5 COMMUNICATING IN ENGLISH',
          totalHours: 26
        }
      ]
    },
    {
      id: 2,
      Quadrimestre: 'Quadrimestre 2',
    },
    {
      id: 3,
      Quadrimestre: 'Quadrimestre 3',
    },
    {
      id: 4,
      Quadrimestre: 'Quadrimestre 4',
    },
    {
      id: 5,
      Quadrimestre: 'Quadrimestre 5',
    },
    {
      id: 6,
      Quadrimestre: 'Quadrimestre 6',
    },
  ];
}


