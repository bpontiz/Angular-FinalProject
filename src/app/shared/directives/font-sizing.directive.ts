import { Directive, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFontSizing]'
})
export class FontSizingDirective {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setFontSize();
  };

  setFontSize(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size',
      '20px'
    )
  };
};
