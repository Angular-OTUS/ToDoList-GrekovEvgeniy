import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { Button } from "../button/button";
import { Task, TaskStatus } from '../../interfaces/interfaces';
import { Tooltip } from '../../directives/tooltip';
import { FormsModule } from "@angular/forms";
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-to-do-list-item',
  imports: [Button, Tooltip, FormsModule, MatCheckbox],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  public propTask = input.required<Task>()
  public propSelectedId = input.required<number | null>()
  public propEditedId = input.required<number | null>()
  protected readonly propOnDelete = output<void>()
  protected readonly propOnSave = output<string>()
  protected readonly propOnToggleStatus = output<TaskStatus>()

  protected isSelected = computed<boolean>(() => this.propSelectedId() === this.propTask().id)
  protected isEdited = computed<boolean>(() => this.propEditedId() === this.propTask().id)
  protected isComletedTaskStatus = computed<boolean>(() => this.propTask().status === TaskStatus.COMPLETED)
  protected readonly tittle = linkedSignal(() =>  this.isEdited() ? this.propTask().tittle : "")

  protected onDeleteTask(): void {
    this.propOnDelete.emit()
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
