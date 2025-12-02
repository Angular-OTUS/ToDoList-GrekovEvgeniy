import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {
  private readonly http = inject(HttpClient)
  private readonly url = "http://localhost:3000"

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`)
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/tasks/${id}`)
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}/tasks`, task)
  }

  public updateTask(id: number, task: Partial<Task>): Observable<Partial<Task>> {
    return this.http.patch<Partial<Task>>(`${this.url}/tasks/${id}`, task)
  }

}
