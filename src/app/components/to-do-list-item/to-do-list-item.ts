import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { Button } from "../button/button";
import { Task, TaskStatus } from '../../interfaces/interfaces';
import { Tooltip } from '../../directives/tooltip';
import { FormsModule } from "@angular/forms";
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckbox, MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-to-do-list-item',
  imports: [Button, Tooltip, FormsModule, MatCheckbox, RouterModule],
  providers: [{
    provide: MAT_CHECKBOX_DEFAULT_OPTIONS, 
    useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions
}],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  public readonly propTask = input.required<Task>()
  public readonly propEditedId = input.required<number | null>()
  public readonly TaskStatus = TaskStatus

  protected readonly propOnDelete = output<void>()
  protected readonly propOnSave = output<string>()
  protected readonly propOnChangeStatus = output<TaskStatus>()
  protected readonly title = linkedSignal(() =>  this.isEdited() ? this.propTask().title : "")
  protected readonly isEdited = computed<boolean>(() => this.propEditedId() === this.propTask().id)
  protected readonly checkboxIsChecked = computed(() => this.propTask().status === TaskStatus.COMPLETED);
  protected readonly checkboxIsIndeterminate = computed(() => this.propTask().status === TaskStatus.IN_PROGRESS);

  private readonly router = inject(Router)
  private readonly checkboxOrder: TaskStatus[] = Object.values(TaskStatus);
  private readonly checkboxOrderLength: number = this.checkboxOrder.length;

  protected onDeleteTask(): void {
    this.router.navigate(['/backlog'])
    this.propOnDelete.emit()
  }

  protected onSaveTask(): void {
    this.propOnSave.emit(this.title())
  }

  protected toggleState($event: MouseEvent): void {
    $event.stopPropagation()
    const nextStatus = this.getNextState(this.propTask().status);
    this.propOnChangeStatus.emit(nextStatus);
  }

  private getNextState(status: TaskStatus): TaskStatus {
    const currentIndex = this.checkboxOrder.indexOf(status);
    const newStatus = this.checkboxOrder[(currentIndex + 1) % this.checkboxOrderLength];
    return newStatus
  }

}
