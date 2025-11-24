import { Component, computed, inject, Signal } from '@angular/core';
import { SortedTasksByStatus, Task, TaskStatus } from '../../interfaces/interfaces';
import { ToDoListStore } from '../../services/to-do-list-store';
import { descTaskStatus } from '../../constants/description';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private readonly store = inject(ToDoListStore)
  protected headerStatus = descTaskStatus
  protected orderColumnStatus = Object.values(TaskStatus)
  protected readonly sortedTasks: Signal<SortedTasksByStatus> = computed(() => this.getSortedTasks())

  private getSortedTasks(): SortedTasksByStatus {
    const result = {
      [TaskStatus.SCHEDULED]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.COMPLETED]: [],
    } as SortedTasksByStatus
    this.store.getTasks().forEach((task) => result[task.status].push(task))
    return result
  }

}
