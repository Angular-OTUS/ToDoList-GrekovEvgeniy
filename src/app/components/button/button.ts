import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public readonly propType =input.required<string>()
  public readonly propDisabled = input<boolean>(false)

  protected readonly propOnClick = output<void>()

  protected onClick(event: MouseEvent): void {
    this.propOnClick.emit()
    event.stopPropagation()
  }
}
