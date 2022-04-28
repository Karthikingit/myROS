import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-popup-with-reason',
  templateUrl: './popup-with-reason.component.html',
  styleUrls: ['./popup-with-reason.component.scss'],
})
export class PopupWithReasonComponent implements OnInit {

  @Input()
  popuptitle: String;
  @Input()
  buttonName: String;
  @Input()
  popupReason: String;

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: `${this.popupReason}`,
        closeOnBackdropClick: false,
      });
  }

}

