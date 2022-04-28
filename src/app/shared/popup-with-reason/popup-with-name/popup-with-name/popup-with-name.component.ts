import { TemplateRef } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-popup-with-name',
  templateUrl: './popup-with-name.component.html',
  styleUrls: ['./popup-with-name.component.scss'],
})
export class PopupWithNameComponent implements OnInit {
     str: string;

  @Input()
  popuptitle: String;

  @Output() name = new EventEmitter<string>();

  saveName() {
    this.name.emit(this.str);
  }

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'Reason for this dialog box',
        closeOnBackdropClick: false,
      });
  }



}
