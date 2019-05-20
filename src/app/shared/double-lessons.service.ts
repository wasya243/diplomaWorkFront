import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IDoubleLesson = diploma.IDoubleLesson;

@Injectable()
export class DoubleLessonsService {

  constructor(private http: HttpClient) {
  }

  getDoubleLessons(): Observable<Array<IDoubleLesson>> {
    return this.http.get<IDoubleLesson[]>(`/double-lessons`);
  }

  getDoubleLessonById(doubleLessonId: number): Observable<IDoubleLesson> {
    return this.http.get<IDoubleLesson>(`/double-lessons/${doubleLessonId}`);
  }
}
