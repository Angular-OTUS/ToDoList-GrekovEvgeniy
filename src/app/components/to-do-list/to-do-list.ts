import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Button } from "../button/button";


export class Task {
  constructor(
    public id: number,
    public todoTitle: string,
  ) { }
}

const tasks: Task[] = [
  new Task(0, "Написать мотивационный пост"),
  new Task(1, "Выполнить ДЗ#1"),
  new Task(2, "Послушать онлайн-урок"),
]

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, Button],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {

  protected tasks: Task[] = tasks
  protected newTaskText: string = ""
  protected isLoading: WritableSignal<boolean> = signal(true)

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
    }, 500)

  }

  protected isDisabledAddButton(): boolean {
    return !this.newTaskText || this.newTaskText.trim().length === 0
  }

  protected doDeleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  protected doAddNewTask(): void {
    let idMax = Math.max(0, ...this.tasks.map(task => task.id))
    this.tasks.push(new Task(++idMax, this.newTaskText))
    console.log("ADD")
  }

}
