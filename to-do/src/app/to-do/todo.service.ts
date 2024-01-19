import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos/';

  constructor(private httpClient: HttpClient) {}

  getAllToDos(): Observable<todo[]> {
    return this.httpClient.get<todo[]>(this.apiUrl);
  }

  postToDo(toDoData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, toDoData);
  }

  deleteToDo(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.apiUrl}/${id}`);
  }
}
