import { Injectable, signal, WritableSignal } from '@angular/core';
import { Toast } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly DURATION = 4000
  private readonly toasts: WritableSignal<Toast[]> = signal([])
  public getToasts = this.toasts.asReadonly()
  private idToastForMethodShow = 0

  public show(message: string, duration: number = this.DURATION): void {
    const id = this.idToastForMethodShow
    this.toasts.update(v => [...v, {id, message}])
    setTimeout(() => this.remove(id),  duration)
    this.idToastForMethodShow += 1
  }

  public remove(id: number) {
    this.toasts.update(v => v.filter(t => t.id !== id))
  }

}
