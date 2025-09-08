import { Component } from '@angular/core';


interface Task {
  id: number,
  todoTitle: string
}

const tasks: Task[] = [
    {id: 0, todoTitle: "Написать мотивационный пост"},
    {id: 1, todoTitle: "Выполнить ДЗ#1"},
    {id: 2, todoTitle: "Послушать онлайн-урок"}
  ]

@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList {
  protected readonly tasks: Task[] = tasks
}
