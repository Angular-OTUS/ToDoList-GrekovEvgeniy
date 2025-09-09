import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export class Task {
  constructor(  
    public id: number,
    public todoTitle: string
  ) {}
}

const tasks: Task[] = [
    new Task(0, "Написать мотивационный пост"),
    new Task(1, "Выполнить ДЗ#1"),
    new Task(2, "Послушать онлайн-урок")
]

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule, ToDoListItem, MatFormFieldModule, MatInputModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoList {

  protected tasks: Task[] = tasks
  protected newTaskText: string = ""

  protected isDisabledAddButton(): boolean {
    return !this.newTaskText || this.newTaskText.trim().length === 0
  }

  protected doDeleteTask(id: number): void {
    this.tasks.forEach((task, index) => {
      if(task.id === id) {
        this.tasks.splice(index, 1)
      }
    })
  }

protected doAddNewTask(): void {
  let idMax = Math.max(0, ...this.tasks.map(task => task.id))
  this.tasks.push(new Task(++idMax, this.newTaskText))
}

}
