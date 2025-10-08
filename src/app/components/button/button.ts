import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input({required: true}) public propType!: string;
  @Input({required: false}) public propDisabled?: boolean = false;

  @Output() public readonly propOnClick: EventEmitter<void> = new EventEmitter<void>

  protected onClick(event: MouseEvent): void {
    this.propOnClick.emit()
    event.stopPropagation()
  }
}
