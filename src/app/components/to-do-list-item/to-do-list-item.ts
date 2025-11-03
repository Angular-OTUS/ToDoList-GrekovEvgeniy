import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { Button } from "../button/button";
import { Task, TaskStatus } from '../../interfaces/interfaces';
import { Tooltip } from '../../directives/tooltip';
import { FormsModule } from "@angular/forms";
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-to-do-list-item',
  imports: [Button, Tooltip, FormsModule, MatCheckbox, RouterModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  public readonly propTask = input.required<Task>()
  public readonly propEditedId = input.required<number | null>()

  protected readonly propOnDelete = output<void>()
  protected readonly propOnSave = output<string>()
  protected readonly propOnToggleStatus = output<TaskStatus>()
  protected readonly tittle = linkedSignal(() =>  this.isEdited() ? this.propTask().tittle : "")
  protected isEdited = computed<boolean>(() => this.propEditedId() === this.propTask().id)
  protected isComletedTaskStatus = computed<boolean>(() => this.propTask().status === TaskStatus.COMPLETED)

  private router = inject(Router)

  protected onDeleteTask(): void {
    this.propOnDelete.emit()
    this.router.navigate(['/tasks'])
  }

  protected onSaveTask(): void {
    this.propOnSave.emit(this.tittle())
  }

  protected toggleStatus($event: MouseEvent): void {
    $event.stopPropagation()
    const isCompleted = this.propTask().status === TaskStatus.COMPLETED
    this.propOnToggleStatus.emit(isCompleted ? TaskStatus.IN_PROGRESS : TaskStatus.COMPLETED)
  }

}
