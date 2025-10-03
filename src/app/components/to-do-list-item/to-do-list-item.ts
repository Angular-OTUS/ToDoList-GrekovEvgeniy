import { ChangeDetectionStrategy, Component, EventEmitter, Input, model, ModelSignal, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { Button } from "../button/button";
import { Task } from '../../interfaces/interfaces';
import { Tooltip } from '../../directives/tooltip';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-to-do-list-item',
  imports: [Button, Tooltip, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem implements OnInit {
  protected readonly edited: WritableSignal<boolean> = signal(false)
  protected readonly tittle: ModelSignal<string> = model("")

  @Input({ required: true }) public propTask!: Task
  @Input({ required: true }) public propSelected!: boolean
  @Output() protected readonly propOnDelete: EventEmitter<void> = new EventEmitter<void>
  @Output() protected readonly propOnSave: EventEmitter<string> = new EventEmitter<string>

  ngOnInit(): void {
    this.tittle.set(this.propTask.tittle)
  }

  protected onDeleteTask(): void {
    this.propOnDelete.emit()
  }

  protected onSaveTask(): void {
    this.propOnSave.emit(this.tittle())
    this.edited.set(false)
  }

}
