import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private readonly toastService = inject(ToastService)
  public readonly toasts = this.toastService.getToasts
}
