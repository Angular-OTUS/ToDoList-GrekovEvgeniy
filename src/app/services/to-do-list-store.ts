import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task, TaskForCreate, TaskStatus } from '../interfaces/interfaces';

  const myTasks: Task[] = [
    {id: 0, tittle: "Написать мотивационный пост", description: "Автор: Греков \n Дата 20.08.2025", status: TaskStatus.COMPLETED},
    {id: 1, tittle: "Выполнить ДЗ#1", description: "Автор: OTUS \n Дата 21.08.2025", status: TaskStatus.IN_PROGRESS},
    {id: 2, tittle: "Послушать онлайн-урок", description: "Автор: OTUS \n Дата 22.08.2025", status: TaskStatus.COMPLETED},
  ]

@Injectable({
  providedIn: 'root'
})
export class ToDoListStore {
  private tasks: WritableSignal<Task[]> = signal(myTasks)
  public getTasks = this.tasks.asReadonly()

  public doDeleteTask(id: number): void {
    this.tasks.update(v => v.filter(task => task.id !== id))
  }

  public doAddNewTask(task: TaskForCreate): void {
    this.tasks.update(v => [...v, {...task, id: this.getIdNextAfterMax(), status: TaskStatus.IN_PROGRESS}])
  }

  public doSaveTask(id: number, tittle: string): void {
    this.tasks.update(v => v.map(task => task.id === id ? {...task, tittle} : task))
  }

  public doToggleTaskStatus(id: number, status: TaskStatus): void {
    this.tasks.update(v => v.map(task => task.id === id ? {...task, status} : task))
  }

  private getIdNextAfterMax(): number {
    return Math.max(0, ...this.tasks().map(task => task.id)) + 1
  }

}
