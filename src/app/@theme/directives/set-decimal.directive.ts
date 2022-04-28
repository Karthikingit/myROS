import { Directive, ElementRef, OnChanges } from "@angular/core";

@Directive({
  selector: "[ngxSetDecimal]",
})
export class SetDecimalDirective implements OnChanges {
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    //console.log(this.el.nativeElement);
  }
}
