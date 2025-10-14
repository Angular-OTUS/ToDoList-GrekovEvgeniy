import { inject, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { Task, TaskStatus } from '../interfaces/interfaces';
import { ProtocolService } from './protocol-service';
import { ToastService } from './toast-service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoListStore implements OnDestroy {
  private readonly protocol = inject(ProtocolService)
  private readonly toast = inject(ToastService)

  private destroy$ = new Subject<void>();

  private readonly tasks: WritableSignal<Task[]> = signal([])
  public readonly getTasks: Signal<Task[]> = this.tasks.asReadonly()
  public readonly isEdited: WritableSignal<number | null> = signal(null, { equal: () => false })

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public LoadTasks(): void {
    this.protocol.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.toast.show("Список задач обновлен")
          this.tasks.set(value)
        },
        error: () => {
          this.toast.show("Ошибка получения списка задач")
        }
      })
  }

  public doDeleteTask(id: number): void {
    const task = this.getTasks().find(v => v.id === id)
    this.protocol.deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.show(`Задача "${task?.tittle}" удалена`)
          this.LoadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка удаления задачи "${task?.tittle}"`)
        }
      })
  }

  public doAddNewTask(task: Partial<Task>): void {
    const taskOverall = { ...task, id: this.getIdNextAfterMax(), status: TaskStatus.IN_PROGRESS } as Task
    this.protocol.addTask(taskOverall)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.show(`Задача "${taskOverall.tittle}" добавлена`)
          this.LoadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка добавления задачи "${taskOverall.tittle}"`)
        }
      })
  }

  public doChangeTaskTittle(id: number, tittle: string): void {
    this.protocol.updateTask(id, { tittle })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isEdited.set(null)
          this.toast.show(`Изменен заголовок задачи "${tittle}"`)
          this.LoadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка изменения заголовка задачи "${tittle}"`)
        }
      })
  }

  public doChangeTaskStatus(id: number, status: TaskStatus): void {
    const task = this.getTasks().find(v => v.id === id)
    this.protocol.updateTask(id, { status })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.show(`Изменен статус задачи "${task?.tittle}"`)
          this.LoadTasks()
        },
        error: () => {
          this.toast.show(`Ошибка изменения статуса задачи "${task?.tittle}"`)
        }
      })
  }

  private getIdNextAfterMax(): number {
    return Math.max(0, ...this.tasks().map(task => task.id)) + 1
  }

}