import { Component, signal } from '@angular/core';
import { ToDoList } from "./components/to-do-list/to-do-list";
import { ToastComponent } from "./components/toast-component/toast-component";

@Component({
  selector: 'app-root',
  imports: [ToDoList, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('otus-homework');
}
