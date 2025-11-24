import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from "@angular/router";
import { Description } from '../../interfaces/interfaces';
import { descMainLayoutLinks } from '../../constants/description';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { ToDoListStore } from '../../services/to-do-list-store';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, MatTabsModule, MatButtonModule, RouterModule, LoadingSpinner],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  private readonly store = inject(ToDoListStore)

  protected readonly descLinks: Description[] = descMainLayoutLinks;
  protected readonly isLoading: WritableSignal<boolean> = signal(true)

  ngOnInit(): void {
    setTimeout(() => {
      this.store.loadTasks()
      this.isLoading.set(false)
    }, 500)
  }
  
}
