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
  Quadrimestre: number;
  nouveauTab = new Array<any>(12);

  constructor(private msg: NzMessageService, private api: ApiService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.api.getScheduleFromDB().subscribe(data => {
      console.log(data);
      this.sheduleTab = data;
      console.log(data);
      for (let i = 0; i < this.nouveauTab.length; i++) {
        this.nouveauTab[i] = new Array(46);
      }
      this.nouveauTab[2][5] = 'coucou';
      console.log(this.nouveauTab);
      for (let i = 0; i < this.sheduleTab.length; i++) {
        for (let j = 0; j < this.sheduleTab[i].length; j++) {
          const cours = data[i][j].nom_cours;
          const groupe = data[i][j].groupe;
          const heureD = data[i][j].heure_debut;
          const heureF = data[i][j].heure_fin;
          const local = data[i][j].local;
          const prof = data[i][j].nom_prof;
          const jour = data[i][j].jour;
          const quadrimestre = data[i][j].quadrimestre;
          this.sheduleTab[i][j] = `${cours} \n ${groupe} \n ${heureD} \n ${heureF} \n ${local} \n ${prof}`;
        }
      }
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.msg.success(`${file.name} file uploaded successfully.`);
    this.api.getShedule(file.name).subscribe(
      data => {
        this.sheduleTab = data;
        /*a qu'elle quadrimestre appartiens l'horaire */
        this.Quadrimestre = Number(this.sheduleTab[1][1].charAt(1));
        console.log('voici le quadrimestre:---' + this.Quadrimestre + '----');
        this.api.deleteCourses(this.Quadrimestre);
        //let heure = '';
        for (let i = 0; i < this.sheduleTab.length; i++) {
          for (let j = 1; j < this.sheduleTab[i].length - 1; j++) {
            /*  Extraite heure de debut et heure de fin de chaque cours */
            //let heure = '';
            let stringHeure = this.sheduleTab[i][j];
            let faireTraitement = false;
            //if (stringHeure.length > 15) {
            /*for (let z = 0; z < stringHeure.length; z++) {
              // s'il n'ya pas de H on fais rien car ca a deja été traité
              if (stringHeure.charAt(z) === 'h') {
                faireTraitement = true;
              }
            }*/
            faireTraitement = (stringHeure.includes('h'));
            if (faireTraitement) {
              //    Extraction Heure debut et heure de fin pour calculer la duree du cours
              let temp = stringHeure.split('h');
              let heureDebut = temp[0];
              let heureFin = temp[1];
              let heureDebutMinute = heureFin.substring(0, 2);
              let stringHeureDebut = heureDebut + 'h' + heureDebutMinute; //  TO USE
              heureFin = heureFin.substring(heureFin.length - 2, heureFin.length);
              let dureeCours = this.getDureeCours(heureDebut, heureFin);
              let nbFoisrepeter = (dureeCours * 60) / 15;
              let stringHeureFin = heureFin + 'h' + heureDebutMinute;//  TO USE
              //console.log(' heure de debut = ' + stringHeureDebut + ' heure de fin ' + stringHeureFin);
              //    Extraire le nom du cours
              var nomCours = this.recombinerSplit(temp);
              let jour = (this.sheduleTab[0][j] === '') ? this.sheduleTab[0][j - 1] : this.sheduleTab[0][j];
              let tabInfo = nomCours.split('•');
              let nomClasse = tabInfo[1]; //  TO USE
              let nomGroupeSemaine = tabInfo[2];     //  TO USE
              let groupe = (stringHeure.includes('Gr. 1')) ? 1 : ((stringHeure.includes('Gr. 2')) ? 2 : 0);
              let string = tabInfo[0];
              let iteration = this.catchFirstMajLetter(string);
              let nomProf = string.substring(iteration, string.length - 1);//  TO USE
              var nomCours = string.substring(1, iteration - 1);//  TO USE
              console.log(`le cours ${nomCours} se déroule le ${jour}`);
              //console.log(`voici le nom du cours ${nomCours} et voici son groupe ${groupe}`);
              //console.log(' le nom du prof = ' + nomProf + ' le nom du cours = ' + nomCours);
              const CoursT = {
                nomCours,
                nomProf,
                nomClasse,
                groupe,
                stringHeureDebut,
                stringHeureFin,
                quadrimestre: this.Quadrimestre,
                jour
              };
              this.api.recordCourse(CoursT);
              for (let m = i; m < i + nbFoisrepeter; m++) {
                this.sheduleTab[m][j] = nomCours + ' ' + nomProf + ' ' + nomGroupeSemaine + ' ' + nomClasse;
              }
              faireTraitement = false;
            }
          }
          // }
        }
      },
      error => {
      });
    return false;
  };

  currentPageDataChange($event: ItemData[]): void {
  }

  getDureeCours(heureDebut, heureFin) {
    return heureFin - heureDebut;
  }

  catchFirstMajLetter(Lestring) {
    let getOutFromLoop = false;
    let iteration = 0;
    for (let n = Lestring.length - 1; n >= 0; n--) {
      if (!getOutFromLoop && isNaN(Lestring.charAt(n)) && Lestring.charAt(n) === Lestring[n].toUpperCase()) {
        getOutFromLoop = true;
        iteration = n;
      }
    }
    return iteration;
  }

  recombinerSplit(stringTab) {
    let stock = '';
    let temp = false;
    stock = stringTab[2];
    stringTab[2] = stock.substring(2, stock.length);
    stock = '';
    for (let i = 2; i < stringTab.length; i++) {
      stock += stringTab[i];
    }
    return stock;
  }

  hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

}
