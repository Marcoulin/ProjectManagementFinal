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
  beforeUpload = (file: UploadFile): boolean => {
    this.msg.success(`${file.name} file uploaded successfully.`);
    this.api.getShedule(file.name).subscribe(
      data => {

        this.sheduleTab=data;



/*a qu'elle quadrimestre appartiens l'horaire */
          switch(data[1][1])
          {

            case "Q1": console.log(" HORAIRE Q1"); break;
            case "Q2": console.log(" HORAIRE Q2");break;
            case "Q3": console.log(" HORAIRE Q3");break;
            case "Q4": console.log(" HORAIRE Q4");break;
            case "Q5": console.log(" HORAIRE Q5");break;
            case "Q6": console.log(" HORAIRE Q6");break;

          }
          function hasWhiteSpace(s) {
            return s.indexOf(' ') >= 0;
          }
          function catchFirstMajLetter(string)
           {

             var getOutFromLoop = false;
             var iteration = 0;
             for (var n = string.length-1; n >= 0; n--)
             {

                 if(!getOutFromLoop)
                 {
                          if(isNaN(string.charAt(n)))
                          {

                            if(string.charAt(n) == string[n].toUpperCase())
                               {
                                     getOutFromLoop = true;
                                     iteration = n;

                               }
                          }
                 }
             }
              return iteration ;
         }
          function getDureeCours(heureDebut, heureFin)
          {
            return heureFin - heureDebut;
          }


          function recombinerSplit(stringTab)
          {
              var stock = "";
              var temp = false;
              stock = stringTab[2];
              var stockII = stock.substring(2,stock.length);
              stringTab[2]= stockII;
              stock="";
             for (var i = 2; i < stringTab.length; i++)
              {

                stock+=stringTab[i];
              }

             return stock;
          }

          var heure = "";
          for (var i = 0; i < data.length; i++)
          {
              for (var j = 0; j < data[i].length; j++)
                     {

                            /*  Extraite heure de debut et heure de fin de chaque cours */
                                var heure = "";
                                var stringHeure = data[i][j];
                                 var faireTraitement = false;
                                if(stringHeure.length > 15)
                                {

                                  for (var z = 0; z < stringHeure.length; z++)
                                   {
                                      // s'il n'ya pas de H on fais rien car ca a deja été traité
                                      if(stringHeure.charAt(z) == 'h')
                                      {
                                        faireTraitement = true;
                                      }
                                   }
                                  if(faireTraitement)
                                  {
                                  //    Extraction Heure debut et heure de fin pour calculer la duree du cours
                                        console.log(data[i][j])
                                        var temp = stringHeure.split("h");
                                        var heureDebut = temp[0];
                                        var heureFin = temp[1];
                                        var heureDebutMinute = heureFin.substring(0,2);
                                        var stringHeureDebut = heureDebut+"h"+ heureDebutMinute; //  TO USE

                                        heureFin = heureFin.substring(heureFin.length-2,heureFin.length);

                                        var dureeCours = getDureeCours(heureDebut,heureFin);
                                        var nbFoisrepeter = (dureeCours*60)/15;
                                        var stringHeureFin = heureFin + "h" +heureDebutMinute;//  TO USE
                                        console.log(" heure de debut = " + stringHeureDebut + " heure de fin " + stringHeureFin);

                                  //    Extraire le nom du cours
                                        var nomCours  = recombinerSplit(temp);

                                        var tabInfo = nomCours.split("•");
                                        var nomClasse = tabInfo[1]; //  TO USE
                                        var nomGroupeSemaine = tabInfo[2];     //  TO USE
                                        var string = tabInfo[0];
                                        var iteration = catchFirstMajLetter(string);
                                        var nomProf =  string.substring(iteration,string.length);//  TO USE
                                        var nomCours = string.substring(0,iteration);//  TO USE


                                        console.log(" le nom du prof = " + nomProf + " le nom du cours = " + nomCours)
                                        for (var m = i; m < i+nbFoisrepeter; m++)
                                         {

                                            data[m][j]=  nomCours + " " +nomProf + " "+nomGroupeSemaine  +  " "+nomClasse ;
                                         }
                                      faireTraitement = false;

                                  }



                                }

                                }


                     }






      },
      error => {

      });
    return false;
  };

// traitement pour les cases vides



}
