import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../button/button";
import { Task } from '../../interfaces/interfacse';
import { Tooltip } from '../../directives/tooltip';


@Component({
  selector: 'app-to-do-list-item',
  imports: [Button, Tooltip],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  @Input({required: true}) public propTask!: Task
  @Input({required: true}) public propSelected!: boolean
  @Output() protected readonly propOnDelete: EventEmitter<number> = new EventEmitter<number>

  protected onDeleteTask(): void {
    this.propOnDelete.emit(this.propTask.id)
  }
}
