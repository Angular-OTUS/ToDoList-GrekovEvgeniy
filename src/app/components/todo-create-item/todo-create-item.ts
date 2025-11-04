import { ChangeDetectionStrategy, Component, computed, model, output } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { Button } from "../button/button";
import { FormsModule } from '@angular/forms';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-todo-create-item',
  imports: [MatInputModule, Button, FormsModule],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoCreateItem {
  protected readonly title = model("")
  protected readonly description = model("")
  protected readonly disabledAddButton = computed<boolean>(() => this.isDisabledAddButton())
  protected readonly propCreate = output<Partial<Task>>()
  
  private isDisabledAddButton(): boolean {
    return !this.title()?.trim()
  }

  protected onAdd(): void {
    this.propCreate.emit({title: this.title(), description: this.description()})
    this.title.set("")
    this.description.set("")
  }
}
