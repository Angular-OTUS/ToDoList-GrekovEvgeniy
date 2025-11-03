import { ChangeDetectionStrategy, Component, computed, linkedSignal, model, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task, TaskFilterDescription, TaskStatus } from '../../interfaces/interfaces';
import { ToDoListStore } from '../../services/to-do-list-store';
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MatSelectModule } from '@angular/material/select';
import { TodoCreateItem } from "../todo-create-item/todo-create-item";
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router, RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, LoadingSpinner, MatSelectModule,
    TodoCreateItem, ToDoListItem,
    RouterModule
],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected readonly editedTaskId: WritableSignal<number | null> = linkedSignal(() => this.store.isEdited())
  protected readonly isLoading: WritableSignal<boolean> = signal(true)
  protected readonly filteredTasks: Signal<Task[]>
  protected readonly filterOptions = filterOptions
  protected readonly checkedFilterOption = model(filterOptions[0].value)
  
  constructor(
    private readonly store: ToDoListStore,
  ) {
    this.filteredTasks = computed<Task[]>(() => store.getTasks().filter(
      (task) => this.checkedFilterOption() === "All" || task.status === this.checkedFilterOption()))
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.LoadTasks()
      this.isLoading.set(false)
    }, 500)
  }

  protected doDeleteTask(id: number): void {
    this.store.doDeleteTask(id)
  }

  protected doAddNewTask(task: Partial<Task>): void {
    this.store.doAddNewTask(task)
  }

  protected doChangeTaskTittle(id: number, tittle: string): void {
    this.store.doChangeTaskTittle(id, tittle)
  }

  protected doChangeTaskStatus(id: number, status: TaskStatus): void {
    this.store.doChangeTaskStatus(id, status)
  }

  // protected setSelectedId(id: number): void {
  //   this.selectedTaskId.set(this.selectedTaskId() === id ? null : id)
  // }

  protected setEditedId(id: number): void {
    this.editedTaskId.set(this.editedTaskId() === id ? null : id)
  }

  // private getSelectedTaskDeskription(): string {
  //   const selectedTask = this.filteredTasks().find((task) => task.id === this.selectedTaskId())
  //   return selectedTask ? selectedTask.description : "Выделите задачу, и здесь появится подробное её описание" 
  // }

}

const filterOptions: TaskFilterDescription[] = [
  {value: "All", alias: "Все"},
  {value: TaskStatus.COMPLETED, alias: "Выполненные"},
  {value: TaskStatus.IN_PROGRESS, alias: "В работе"},
]
