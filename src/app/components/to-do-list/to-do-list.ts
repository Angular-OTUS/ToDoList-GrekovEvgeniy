import { Component } from '@angular/core';

const tasks: string[] = [
    "Написать мотивационный пост", 
    "Выполнить ДЗ#1",
    "Послушать онлайн-урок",
  ]

@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList {
  protected readonly tasks: string[] = tasks
}
