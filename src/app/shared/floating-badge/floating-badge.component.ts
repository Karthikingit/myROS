import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-floating-badge',
  template: `<div class="floating-badge">{{ text }}</div>`,
  styles: [ `
    .floating-badge {
      position: absolute;
      background-color: #404040;
      width: 30px;
      height: 30px;
      margin-top: auto;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      right: -10px;
      top: -10px;
    }
  `],
})
export class FloatingBadgeComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
