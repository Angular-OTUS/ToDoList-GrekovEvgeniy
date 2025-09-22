import { ComponentRef, Directive, ElementRef, HostListener, Input, Renderer2, signal, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip-component/tooltip-component';
import { T } from '@angular/cdk/keycodes';

@Directive({
  selector: '[appTooltip]',
})
export class Tooltip {
  private componentRef!: ComponentRef<TooltipComponent>
  @Input({required: true}) appTooltip!: string

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter') show() {
    console.log("Tooltip")
    this.createTooltip()
  }

  @HostListener('mouseleave') hide() {
    this.destroy()
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.destroy()
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    this.destroy()
  }

  private createTooltip(): void {
    this.componentRef = this.viewContainerRef.createComponent(TooltipComponent)
    this.componentRef.instance.propText = this.appTooltip
    this.setTooltipPosition()
  }

  private setTooltipPosition(): void {
    const pos = this.elementRef.nativeElement.getBoundingClientRect()
    this.componentRef.instance.propOffsetX = pos.left;
    this.componentRef.instance.propOffsetY = pos.top;
  }

  private destroy(): void {
    if(this.componentRef) {
      this.componentRef.destroy()
    }
  }

}
