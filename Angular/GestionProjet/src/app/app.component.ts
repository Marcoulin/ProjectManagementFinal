import {Component} from '@angular/core';
import {ApiService} from "./Services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: any = [{title: 'Titanic', desc: 'film de romance', year: '12 ans'}]
  isCollapsed = true;
  title = 'GestionProjet';
  longueur = "80px";

  constructor(private api: ApiService) {
  }

  getMovie () {
    this.api.getMovies().subscribe(
      data => {
        console.log(data)
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    )
  };

  getCoucou () {
    this.api.getCoucou().subscribe(
      data => {
        //this.coucouM=data['content'];
        console.log(data)
      },
      error => {
        console.log("ta une erreur mec");
        console.log(error);
      }
    )
  };

  toggleCollapsed(): void {
    this.longueur = (this.isCollapsed) ? "240px" : "80px";
    this.isCollapsed = !this.isCollapsed;
  }
}
