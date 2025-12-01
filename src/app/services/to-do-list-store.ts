import { DestroyRef, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Task, TaskStatus } from '../interfaces/interfaces';
import { ProtocolService } from './protocol-service';
import { ToastService } from './toast-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ToDoListStore {
  private readonly protocol = inject(ProtocolService)
  private readonly toast = inject(ToastService)
  private readonly destroyRef = inject(DestroyRef);

  private readonly tasks: WritableSignal<Task[]> = signal([])
  public readonly getTasks: Signal<Task[]> = this.tasks.asReadonly()

  private readonly isLoading: WritableSignal<boolean> = signal(true)
  public readonly getIsLosding: Signal<boolean> = this.isLoading.asReadonly()
  
  public readonly isEdited: WritableSignal<number | null> = signal(null, { equal: () => false })

  public loadTasks(): void {
    this.isLoading.set(true)
    this.protocol.getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          this.toast.show("Список задач обновлен")
          this.tasks.set(value)
          this.isLoading.set(false)
        },
        error: () => {
          this.toast.show("Ошибка получения списка задач")
        }
      })
  }

  public doDeleteTask(id: number): void {
    const task = this.getTasks().find(v => v.id === id)
    this.protocol.deleteTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show(`Задача "${task?.title}" удалена`)
          this.loadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка удаления задачи "${task?.title}"`)
        }
      })
  }

  public doAddNewTask(task: Partial<Task>): void {
    const taskOverall = { ...task, id: this.getIdNextAfterMax(), status: TaskStatus.SCHEDULED } as Task
    this.protocol.addTask(taskOverall)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show(`Задача "${taskOverall.title}" добавлена`)
          this.loadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка добавления задачи "${taskOverall.title}"`)
        }
      })
  }

  public doChangeTaskTitle(id: number, title: string): void {
    this.protocol.updateTask(id, { title: title })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isEdited.set(null)
          this.toast.show(`Изменен заголовок задачи "${title}"`)
          this.loadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка изменения заголовка задачи "${title}"`)
        }
      })
  }

  public doChangeTaskStatus(id: number, status: TaskStatus): void {
    const task = this.getTasks().find(v => v.id === id)
    this.protocol.updateTask(id, { status })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show(`Изменен статус задачи "${task?.title}"`)
          this.loadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка изменения статуса задачи "${task?.title}"`)
        }
      })
  }

  private getIdNextAfterMax(): number {
    return Math.max(0, ...this.tasks().map(task => task.id)) + 1
  }

}