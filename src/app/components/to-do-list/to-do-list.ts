import { ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task, TaskStatus } from '../../interfaces/interfaces';
import { ToDoListStore } from '../../services/to-do-list-store';
import { MatSelectModule } from '@angular/material/select';
import { TodoCreateItem } from "../todo-create-item/todo-create-item";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    TodoCreateItem, ToDoListItem,
    RouterModule
],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList {
  private readonly store = inject( ToDoListStore)
  
  protected readonly editedTaskId: WritableSignal<number | null> = linkedSignal(() => this.store.isEdited())
  protected readonly tasks: Signal<Task[]>  = this.store.getTasks
  
  protected doDeleteTask(id: number): void {
    this.store.doDeleteTask(id)
  }

  protected doAddNewTask(task: Partial<Task>): void {
    this.store.doAddNewTask(task)
  }

  protected doChangeTaskTitle(id: number, title: string): void {
    this.store.doChangeTaskTitle(id, title)
  }

  protected doChangeTaskStatus(id: number, status: TaskStatus): void {
    this.store.doChangeTaskStatus(id, status)
  }

  protected setEditedId(id: number): void {
    this.editedTaskId.set(this.editedTaskId() === id ? null : id)
  }

}