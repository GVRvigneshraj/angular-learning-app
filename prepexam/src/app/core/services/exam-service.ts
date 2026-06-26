import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {

  constructor(private http: HttpClient) {}

  getExams(): Observable<any[]> {
    return this.http.get<any[]>('/assets/data/exams.json');
  }
}
