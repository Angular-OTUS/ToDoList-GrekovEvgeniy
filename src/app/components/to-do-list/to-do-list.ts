import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from "../to-do-list-item/to-do-list-item";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Task } from '../../interfaces/interfacse';
import { Button } from "../button/button";
import { Tooltip } from '../../directives/tooltip';

const myTasks: Task[] = [
  new Task(0, "Написать мотивационный пост", "Автор: Греков \n Дата 20.08.2025"),
  new Task(1, "Выполнить ДЗ#1", "Автор: OTUS \n Дата 21.08.2025"),
  new Task(2, "Послушать онлайн-урок", "OTUS: Греков \n Дата 22.08.2025"),
]

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, Button, Tooltip],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {

  protected tasks: Task[] = myTasks
  protected newTaskTittle: string = ""
  protected newTaskDescription: string = ""
  protected selectedItemId: number | null = null
  protected isLoading: WritableSignal<boolean> = signal(true)

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
    }, 500)
  }

  protected isDisabledAddButton(): boolean {
    return !this.newTaskTittle || this.newTaskTittle.trim().length === 0
  }

  protected doDeleteTask(id: number): void {
    if(this.selectedItemId === id) this.selectedItemId = null
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  private getIdNextAfterMax(): number {
    return Math.max(0, ...this.tasks.map(task => task.id)) + 1
  }

  protected doAddNewTask(): void {
    this.tasks.push(new Task(this.getIdNextAfterMax(), this.newTaskTittle, this.newTaskDescription))
  }

  protected setSelectedId(id: number, event: MouseEvent): void {
    this.selectedItemId = id
    event.stopPropagation()
  }

  protected getSelectedTaskDeskription(): string {
    const selectedTask = this.tasks.find((task) => task.id === this.selectedItemId)
    return selectedTask?.description || ""
  }

  protected isSelected(id: number): boolean {
    return this.selectedItemId === id
  }

  protected onClickRoot(): void {
    this.selectedItemId = null
  }

}
