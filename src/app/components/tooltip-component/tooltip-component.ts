import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip-component',
  imports: [],
  templateUrl: './tooltip-component.html',
  styleUrl: './tooltip-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

  @Input({required: true}) public propText!: string
  @Input({required: true}) public propOffsetX!: number
  @Input({required: true}) public propOffsetY!: number

  protected getValuePx(value: number): string {
    return value + "px"
  }

}
