import {Component} from '@angular/core';
import {ApiService} from './Services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: any = [{title: 'Titanic', desc: 'film de romance', year: '12 ans'}];
  isCollapsed = true;
  title = 'GestionProjet';
  longueur = '80px';

  constructor(private api: ApiService) {
  }

  toggleCollapsed(): void {
    this.longueur = (this.isCollapsed) ? '240px' : '80px';
    this.isCollapsed = !this.isCollapsed;
  }
}
