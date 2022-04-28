import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-toggle-tab',
  templateUrl: './toggle-tab.component.html',
  styleUrls: ['./toggle-tab.component.scss']
})
export class ToggleTabComponent implements OnInit {

  constructor() { }

  @Input() firstTab: string;
  @Input() secondTab: string;  
  @Output() selectedTabEvent = new EventEmitter<string>();

  selectedTab:string; 

  ngOnInit(): void {
    this.setTab(this.firstTab);
  }

  setTab(s: string){
    this.selectedTab = s;
    this.selectedTabEvent.emit(this.selectedTab);
  }

}
