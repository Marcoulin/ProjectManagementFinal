import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl='http://127.0.0.1:8000/';
  constructor(private http:HttpClient) {}

  getMovies(){
    return this.http.get(this.baseUrl+'movies/')
  }
  // pour envoyer des donnée au serveur il faut mettre ?query = ....
  getCoucou(){
    return this.http.get(this.baseUrl+'coucou/?query=JeanEstache')
  }
  getShedule(fileName:string){
    return this.http.get(this.baseUrl+`shedule/?query=${fileName}`)
  }
}
