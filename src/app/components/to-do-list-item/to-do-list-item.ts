import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../to-do-list/to-do-list';
import { Button } from "../button/button";

@Component({
  selector: 'app-to-do-list-item',
  imports: [Button],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  @Input({required: true}) public task!: Task
  @Output() protected readonly doDeleteTask: EventEmitter<number> = new EventEmitter<number>
}
