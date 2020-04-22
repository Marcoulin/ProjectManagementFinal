import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {
  }

  getShedule(fileName: string) {
    return this.http.get(this.baseUrl + `Schedule/?query=${fileName}`);
  }

  getAllCourses(quadri: number) {
    return this.http.get(this.baseUrl + `AllCourses/?query=${quadri}`);
  }

  // tslint:disable-next-line:max-line-length
  recordCourse(CoursT) {
    return this.http.post(this.baseUrl + 'RecordCourse/', CoursT).subscribe();
  }

  deleteCourses(quadri: number) {
    return this.http.get(this.baseUrl + `DeleteAllCourses/?quadri=${quadri}`).subscribe();
  }

  getScheduleFromDB(quadriFromClick: number) {
    return this.http.get(this.baseUrl + `GetScheduleFromDB/?quadri=${quadriFromClick}`);
  }

  getUeFromDB() {
    return this.http.get(this.baseUrl + `GetAllUe/`);
  }

  checkCoursesOverlap(checkTab: string[]) {
    return this.http.post(this.baseUrl + `OverlapCheck/`, checkTab);
  }
}
