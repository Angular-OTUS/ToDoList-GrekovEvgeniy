import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip-component',
  imports: [],
  templateUrl: './tooltip-component.html',
  styleUrl: './tooltip-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
  public readonly propText = input.required<string>()
  public readonly propOffsetX = input.required<number>()
  public readonly propOffsetY = input.required<number>()

  protected getValuePx(value: number): string {
    return value + "px"
  }
}
