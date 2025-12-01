import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoListStore } from '../../services/to-do-list-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(ToDoListStore);

  protected taskId = toSignal(
    this.route.paramMap.pipe(map(params => +(params.get('id') || 0))), {initialValue: null}
  );

  protected task = computed(() => {
    const id = this.taskId();
    if (typeof id !== 'number') return null;
    return this.store.getTasks().find(v => v.id === id) || null;
  });
}
