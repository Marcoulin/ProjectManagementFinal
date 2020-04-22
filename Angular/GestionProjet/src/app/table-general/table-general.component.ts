import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ApiService} from '../Services/api.service';
import {HttpClient} from '@angular/common/http';
import {ItemData} from '../item-data';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.css']
})
export class TableGeneralComponent implements OnInit, OnChanges {
  sheduleTab: any = [[]];
  Chiffre = 1;
  Quadrimestre: number;
  nouveauTab = new Array<any>(11);
  @Input() quadriFromClick;

  constructor(private msg: NzMessageService, private api: ApiService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.extracted(this.quadriFromClick);
  }

  private extracted(quadrii: number) {
    this.api.getScheduleFromDB(quadrii).subscribe(data => {
      console.log(data);
      this.sheduleTab = data;
      const quadriTemp = 'Q' + this.sheduleTab[1][1].quadrimestre;
      for (let i = 0; i < this.nouveauTab.length; i++) {
        this.nouveauTab[i] = new Array(12);
      }
      this.nouveauTab[1][0] = '';
      this.nouveauTab[0][1] = 'LUNDI';
      this.nouveauTab[0][3] = 'MARDI';
      this.nouveauTab[0][5] = 'MERCREDI';
      this.nouveauTab[0][7] = 'JEUDI';
      this.nouveauTab[0][9] = 'VENDREDI';
      this.nouveauTab[1][1] = quadriTemp;
      this.nouveauTab[1][3] = quadriTemp;
      this.nouveauTab[1][5] = quadriTemp;
      this.nouveauTab[1][7] = quadriTemp;
      this.nouveauTab[1][9] = quadriTemp;

      for (let i = 0; i < this.sheduleTab.length; i++) {
        for (let j = 0; j < this.sheduleTab[i].length; j++) {

          const cours = data[i][j].nom_cours;
          const groupe = (data[i][j].groupe === 0) ? 'TOUS' : ((data[i][j].groupe === 1) ? 'Gr. 1' : 'Gr. 2');
          const heureD = data[i][j].heure_debut;
          const heureF = data[i][j].heure_fin;
          const local = data[i][j].local;
          const prof = data[i][j].nom_prof;
          const jour = data[i][j].jour;
          const quadrimestre = data[i][j].quadrimestre;


          this.sheduleTab[i][j] = `${heureD} - ${heureF}  \n ${cours}  \n ${prof}  \n ${local} \n ${groupe}`;
          this.nouveauTab[j + 2][(i * 2) + 1] = this.sheduleTab[i][j];

          //       this.nouveauTab[j + 2][(i * 2) + 1] = " gola haazedaze haeaze haeazeeh eee ";

        }
      }


      // split ne fonctionne pas dans la for
      for (let j = 0; j < this.nouveauTab[0].length; j++) {


        for (let i = 0; i < this.nouveauTab.length; i++) {
          // extraction de l'heure de debut
          const extractHeureDebutAvant = '' + this.nouveauTab[i][j];


          if (extractHeureDebutAvant.length > 9) {

            const stringTemp = extractHeureDebutAvant.split('h');
            const heureDebuteAvant = stringTemp[0];

            // tri par selection
            let min = i;
            for (let n = i + 1; n < this.nouveauTab.length; n++) {

              const extractHeureDebutApres = '' + this.nouveauTab[n][j];
              const stringTempII = extractHeureDebutApres.split('h');
              const heureDebuteApres = stringTempII[0];


              if (heureDebuteApres < heureDebuteAvant) {


                min = n;
              }

            }

            const tmp = this.nouveauTab[i][j];
            this.nouveauTab[i][j] = this.nouveauTab[min][j];
            this.nouveauTab[min][j] = tmp;


          }

        }
      }


      // alineacion de grupos
      for (let j = 0; j < this.nouveauTab[0].length; j++) {
        for (let i = 0; i < this.nouveauTab.length - 4; i++) {

          const extractHeureDebutAvant = '' + this.nouveauTab[i][j];
          const extractHeureDebutApres = '' + this.nouveauTab[i + 1][j];

          if (extractHeureDebutAvant.length > 9 && extractHeureDebutApres.length > 9) {
            const stringTemp = extractHeureDebutAvant.split('h');
            const stringTempII = extractHeureDebutApres.split('h');
            const heureDebuteAvant = stringTemp[0];
            const heureDebutApres = stringTempII[0];

            if (heureDebuteAvant == heureDebutApres) {

              this.nouveauTab[i][j + 1] = this.nouveauTab[i + 1][j];
              this.nouveauTab[i + 1][j] = '';
              const line = i + 1;

              for (let n = line; n < this.nouveauTab.length - 1; n++) {
                const temp = this.nouveauTab[n][j];
                this.nouveauTab[n][j] = this.nouveauTab[n + 1][j];
                this.nouveauTab[n + 1][j] = temp;
              }

            } else {
              // console.log(this.nouveauTab[i][j])
            }

          }


        }
      }


      this.sheduleTab = this.nouveauTab;

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
        // let heure = '';A
        for (let i = 0; i < this.sheduleTab.length; i++) {
          for (let j = 1; j < this.sheduleTab[i].length - 1; j++) {
            /*  Extraite heure de debut et heure de fin de chaque cours */
            // let heure = '';
            const stringHeure = this.sheduleTab[i][j];
            let faireTraitement = false;
            // if (stringHeure.length > 15) {
            /*for (let z = 0; z < stringHeure.length; z++) {
              // s'il n'ya pas de  on fais rien car ca a deja été traité
              if (stringHeure.charAt(z) === 'h') {
                faireTraitement = true;
              }
            }*/
            faireTraitement = (stringHeure.includes('h'));
            if (faireTraitement) {
              //    Extraction Heure debut et heure de fin pour calculer la duree du cours
              const temp = stringHeure.split('h');
              const heureDebut = temp[0];
              let heureFin = temp[1];
              const heureDebutMinute = heureFin.substring(0, 2);
              const stringHeureDebut = heureDebut + 'h' + heureDebutMinute; //  TO USE
              heureFin = heureFin.substring(heureFin.length - 2, heureFin.length);
              const dureeCours = this.getDureeCours(heureDebut, heureFin);
              const nbFoisrepeter = (dureeCours * 60) / 15;
              const stringHeureFin = heureFin + 'h' + heureDebutMinute; //  TO USE
              // console.log(' heure de debut = ' + stringHeureDebut + ' heure de fin ' + stringHeureFin);
              //    Extraire le nom du cours
              let nomCours = this.recombinerSplit(temp);
              console.log(temp);
              const jour = (this.sheduleTab[0][j] === '') ? this.sheduleTab[0][j - 1] : this.sheduleTab[0][j];
              const tabInfo = nomCours.split('•');
              const nomClasse = tabInfo[1]; //  TO USE
              const nomGroupeSemaine = tabInfo[2];     //  TO USE
              const groupe = (stringHeure.includes('Gr. 1')) ? 1 : ((stringHeure.includes('Gr. 2')) ? 2 : 0);
              const stringO = tabInfo[0];
              const iteration = this.catchFirstMajLetter(stringO);
              const nomProf = stringO.substring(iteration, stringO.length - 1); //  TO
              nomCours = stringO.substring(1, iteration - 1); //  TO USE
              const foreignKey = this.assosiationCours(nomCours);
              //console.log(`le cours ${nomCours} se déroule le ${jour}`);
              // console.log(`voici le nom du cours ${nomCours} et voici son groupe ${groupe}`);
              // console.log(' le nom du prof = ' + nomProf + ' le nom du cours = ' + nomCours);
              const CoursT = {
                nomCours,
                nomProf,
                nomClasse,
                groupe,
                stringHeureDebut,
                stringHeureFin,
                quadrimestre: this.Quadrimestre,
                jour,
                foreignKey
              };
              //console.log(CoursT);
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
  }

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
    const temp = false;
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

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes['quadriFromClick'].currentValue);
    this.quadriFromClick = changes['quadriFromClick'].currentValue;
    this.extracted(this.quadriFromClick);

  }

  private assosiationCours(nomCours): string {
    switch (nomCours) {
      case "Stat et appl en tableur (téorie)":
        return "Statistique et application en tableur";
      case  "Mats appl. à la prog. II":
        return "Mathématiques appliquées à la programmation 2";
      case "Mats appl.à la prog. II":
        return "Mathématiques appliquées à la programmation 2";
      case  "Stat et appl en tableur":
        return "Statistique et application en tableur";
      case  "Professional Englis II":
        return "Professional English 2";
      case  "Plateforme .net (C#,…) IBen":
        return "Plateforme .net (C#,…) I";
      case  "Tec et prat de prés orale et écrite de projets":
        return "Techniques et pratiques de présentation orale et écrite de projets";
      case  "Progr. Web I ":
        return "Programmation web 1";
      case  "Plat .net (C#,…) I":
        return "Plateforme .net (C#,…) I";
      case  "Program-mation Web I":
        return "Programmation web 1";
      case  "Projet .netBen":
        return "Projet .net";
      case  "Dév mobile I":
        return "Développement mobile 1";
      case  "OS II":
        return "Systèmes d'exploitation 2";
      case  "Gestion de conflits":
        return "Pratique de la gestion de conflits";
      case  "Analyse (Merise, UML) II\nBen":
        return "Analyse (Merise, UML) 2";
      case  "Plateforme .net (C#,…) III\nVan":
        return "Plateforme .net (C#,…) III";
      case  "Business Englis":
        return "Business English";
      case  "Java III":
        return "Java 3";
      case  "BD II\nBen":
        return "Base de données 2";
      case "DB II \nBen":
        return "Base de données 2";
      case  "DB II\nBen":
        return "Base de données 2";
      case "Com prof appl aux projets":
        return "Communication professionnelle appliquée aux projets";
      case "Projets & intro à la gestion de projets & com appl. Aux projets\nTapfu, Flament,":
        return "Projets";
      case "Projet .net\nBen":
        return "Projet .net";
      case "Plateforme .net (C#,…) I\nBen":
        return "Plateforme .net (C#,…) I";
      case "SAR: anglais\nSur demande préalable":
        return "SAR: anglais";
      case "SAR: Remédiation en français\nSur demande préalable":
        return "SAR: Remédiation en français";
      case "Mats appl. à la progr. II":
        return "Mathématiques appliquées à la programmation 2";
      case "SAR: Programmation\nSur demande préalable":
        return "SAR: programmation";
      default:
        return nomCours;
    }
  }

}
