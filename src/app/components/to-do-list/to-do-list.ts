import { ChangeDetectionStrategy, Component, computed, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task, TaskFilterDescription, TaskForCreate, TaskStatus } from '../../interfaces/interfaces';
import { ToDoListStore } from '../../services/to-do-list-store';
import { ToastService } from '../../services/toast-service';
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { MatSelectModule } from '@angular/material/select';
import { TodoCreateItem } from "../todo-create-item/todo-create-item";

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, LoadingSpinner, MatSelectModule, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected readonly selectedTaskId: WritableSignal<number | null> = signal(null)
  protected readonly editedTaskId: WritableSignal<number | null> = signal(null)
  protected readonly isLoading: WritableSignal<boolean> = signal(true)

  protected readonly filteredTasks: Signal<Task[]>
  protected readonly selectedTaskDescription: Signal<string>

  protected readonly filterOptions = filterOptions
  protected readonly selectedFilterOption = model(filterOptions[0].value)
  
  constructor(
    private readonly store: ToDoListStore,
    private readonly toastService: ToastService,
  ) {
    this.filteredTasks = computed<Task[]>(() => store.getTasks().filter(
      (task) => this.selectedFilterOption() === "All" || task.status === this.selectedFilterOption()))
    this.selectedTaskDescription = computed<string>(() => this.getSelectedTaskDeskription())
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading.set(false), 500)
  }

  protected doDeleteTask(id: number): void {
    const tittle = this.filteredTasks().find(v => v.id === id)?.tittle
    if (this.selectedTaskId() === id) {
      this.selectedTaskId.set(null)
    }
    this.store.doDeleteTask(id)
    this.toastService.show(`Задача "${tittle}" удалена`)
  }

  protected doAddNewTask(task: TaskForCreate): void {
    this.store.doAddNewTask(task)
    this.toastService.show(`Задача "${task.tittle}" добавлена`)
  }

  protected doSaveTask(id: number, tittle: string): void {
    this.store.doSaveTask(id, tittle)
    this.editedTaskId.set(null)
    this.toastService.show(`Заголовок задачи "${tittle}" изменен`)
  }

  protected doToggleTaskStatus(id: number, status: TaskStatus): void {
    this.store.doToggleTaskStatus(id, status)
  }

  protected setSelectedId(id: number): void {
    this.selectedTaskId.set(this.selectedTaskId() === id ? null : id)
  }

  protected setEditedId(id: number): void {
    this.editedTaskId.set(this.editedTaskId() === id ? null : id)
  }

  private getSelectedTaskDeskription(): string {
    if(this.selectedTaskId() === null) {
      return "Выделите задачу, и здесь появится подробное её описание" 
    } else {
      const selectedTask = this.filteredTasks().find((task) => task.id === this.selectedTaskId())
      return selectedTask?.description || ""
    }
  }

}

const filterOptions: TaskFilterDescription[] = [
  {value: "All", alias: "Все"},
  {value: TaskStatus.COMPLETED, alias: "Выполненные"},
  {value: TaskStatus.IN_PROGRESS, alias: "В работе"},
]
