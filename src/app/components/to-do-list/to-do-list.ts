import { ChangeDetectionStrategy, Component, computed, inject, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Task } from '../../interfaces/interfaces';
import { Button } from "../button/button";
import { Tooltip } from '../../directives/tooltip';
import { ToDoListStore } from '../../services/to-do-list-store';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, Button, Tooltip],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected readonly tasks: Signal<Task[]>

  protected readonly selectedTaskId: WritableSignal<number | null> = signal(null)
  protected readonly editedTaskId: WritableSignal<number | null> = signal(null)
  protected readonly newTaskTittle: ModelSignal<string> = model("")
  protected readonly isLoading: WritableSignal<boolean> = signal(true)
  protected readonly selectedTaskDescription: Signal<string>
  protected readonly disabledAddButton: Signal<boolean>
  protected newTaskDescription: string = ""

  constructor(
    private readonly store: ToDoListStore,
    private readonly toastService: ToastService,
  ) {
    this.tasks = store.getTasks
    this.selectedTaskDescription = computed<string>(() => this.getSelectedTaskDeskription())
    this.disabledAddButton = computed<boolean>(() => this.isDisabledAddButton())
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading.set(false), 500)
  }

  protected doDeleteTask(id: number): void {
    const tittle = this.tasks().find(v => v.id === id)?.tittle
    if (this.selectedTaskId() === id) {
      this.selectedTaskId.set(null)
    }
    this.store.doDeleteTask(id)
    this.toastService.show(`Задача "${tittle}" удалена`)
  }

  protected doAddNewTask(): void {
    this.store.doAddNewTask(this.newTaskTittle(), this.newTaskDescription)
    this.toastService.show(`Задача "${this.newTaskTittle()}" добавлена`)
  }

  protected doSaveTask(id: number, tittle: string): void {
    this.store.doSaveTask(id, tittle)
    this.editedTaskId.set(null)
    this.toastService.show(`Заголовок задачи "${tittle}" изменен`)
  }

  protected setSelectedId(id: number): void {
    this.selectedTaskId.set(this.selectedTaskId() === id ? null : id)
  }

  protected setEditedId(id: number): void {
    this.editedTaskId.set(this.editedTaskId() === id ? null : id)
  }

  private isDisabledAddButton(): boolean {
    return this.newTaskTittle()?.trim().length === 0
  }

  private getSelectedTaskDeskription(): string {
    const selectedTask = this.tasks().find((task) => task.id === this.selectedTaskId())
    return selectedTask?.description || ""
  }

}
