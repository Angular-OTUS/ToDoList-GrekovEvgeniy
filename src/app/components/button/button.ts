import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() public tittleInput: string = '';
  @Input() public typeInput: string = '';
  @Input() public disabledInput: boolean = false;

  @Output() protected readonly clickOutput: EventEmitter<void> = new EventEmitter<void>
}
