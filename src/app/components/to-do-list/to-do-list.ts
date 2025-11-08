import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, model, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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
import { Tooltip } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, LoadingSpinner, MatSelectModule,
    Tooltip,
    TodoCreateItem, ToDoListItem,
    RouterModule
],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  private readonly store = inject( ToDoListStore)

  protected readonly editedTaskId: WritableSignal<number | null> = linkedSignal(() => this.store.isEdited())
  protected readonly isLoading: WritableSignal<boolean> = signal(true)
  protected readonly filteredTasks: Signal<Task[]>
  protected readonly filterOptions = filterOptions
  protected readonly checkedFilterOption = model(filterOptions[0].value)
  
  constructor() {
    this.filteredTasks = computed<Task[]>(() => this.store.getTasks().filter(
      (task) => this.checkedFilterOption() === "All" || task.status === this.checkedFilterOption()))
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.loadTasks()
      this.isLoading.set(false)
    }, 500)
  }

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

const filterOptions: TaskFilterDescription[] = [
  {value: "All", alias: "Все"},
  {value: TaskStatus.COMPLETED, alias: "Выполненные"},
  {value: TaskStatus.IN_PROGRESS, alias: "В работе"},
]
