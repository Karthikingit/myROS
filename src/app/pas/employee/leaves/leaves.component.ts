import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
 viewMode;
 rec; even;
 dates:any;
     events = [
    {
      start :new Date(2021, 2, 2),
      end: new Date(2021, 2, 2),
      status: "Approved",
      icon: 'fa fa-check-circle'
    },
    {
      start :new Date(2021, 2, 10),
      end: new Date(2021, 2, 10),
      status: "Rejected",
      
      
    },
    {
      start :new Date(2021, 2, 27),
      end: new Date(2021, 2, 27),
      status: "Approved",
      icon: 'fa fa-check-circle'

    },
    {
      start :new Date(2021, 2, 17),
      end: new Date(2021, 2, 17),
      status: "Pending",
      delete:"fa fa-trash",
      edit:"fa fa-pencil-alt"
    },
    {
      start :new Date(2021, 3, 27),
      end: new Date(2021, 3, 27),
      status: "Approved",
      icon: 'fa fa-check-circle'

    },
    {
      start :new Date(2021, 4, 23),
      end: new Date(2021, 4, 23),
      status: "Approved",
      icon: 'fa fa-check-circle'

    },
  ]; 
  event = [
    {
      id:1,
      start :new Date(2021, 2, 4),
      end: new Date(2021, 2, 4),
      people:[
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg",
          name:"charan",
          roll:102,
          role:"FOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg",
          name:"shrangi",
          roll:110,
          role:"BOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          name:"ashvita",
          roll:403,
          role:"Management"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(15).jpg",
          name:"satya",
          roll:400,
          role:"FOH"
        }
      ]
    },
    {
      id:2,
      start :new Date(2021, 2, 11),
      end: new Date(2021, 2, 11),
      people:[
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg",
          name:"charan",
          roll:102,
          role:"FOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg",
          name:"shrangi",
          roll:110,
          role:"BOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          name:"ashvita",
          roll:403,
          role:"Management"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(15).jpg",
          name:"satya",
          roll:400,
          role:"FOH"
        }
      ]
      
      
    },
    {
      id:3,
      start :new Date(2021, 2, 26),
      end: new Date(2021, 2, 26),
      people:[
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg",
          name:"charan",
          roll:102,
          role:"FOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg",
          name:"shrangi",
          roll:110,
          role:"BOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          name:"ashvita",
          roll:403,
          role:"Management"
        }
      ]

    },
    {
      id:4,
      start :new Date(2021, 2, 14),
      end: new Date(2021, 2, 14),
      people:[
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg",
          name:"charan",
          roll:102,
          role:"FOH"

        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(12).jpg",
          name:"shrangi",
          roll:110,
          role:"BOH"
        },
        {
          picture:"https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          name:"ashvita",
          roll:403,
          role:"Management"
        }
      ]
    },
  ]; 
  
  closeResult = '';
  viewBankingObj;
  allBanking;
  @ViewChild('content')  content: TemplateRef<any>;
  people;
  constructor(  private modalService: NgbModal, private dialogService: NbDialogService,private router: Router) { }
  open(b) {
    this.people = b;
    this.modalService.open(this.content, { centered: true, backdrop:true,  windowClass: 'sidebar-modal', size: 'lg' });
  }
  id;
  ids=0;
  editform;
  ed;

  @ViewChild('edit')  edit: TemplateRef<any>;
  editdate(b) {
    this.id =b;
    this.modalService.open(this.edit, { centered: true, backdrop:true,  windowClass: 'sidebar-modal', size: 'lg' });
    this.ed = new Date(this.id.date);
    this.ed.setDate(this.ed.getDate()+1)
    this.editform = new FormGroup({
      startdate:new FormControl(this.ed.toISOString().slice(0,10)),
      enddate:new FormControl( this.ed.toISOString().slice(0,10)),
      comment: new FormControl(this.id.status)
    })
    console.log("b:",this.id)
  }
  @ViewChild('request')  request: TemplateRef<any>;
  requestdate() {
    this.modalService.open(this.request, { centered: true, backdrop:true,  windowClass: 'sidebar-modal', size: 'lg' });
    this.requestForm= new FormGroup({
      starttime: new FormControl(),
      endtime:new FormControl(),
      comment: new FormControl()
    })
  }
  start:Date;
  end:Date;
  comment
  requets(){
   
     this.start =  this.requestForm.value.starttime,
     this.end = this.requestForm.value.endtime,
     this.comment = this.requestForm.value.comment
    
    
    console.log("data:",this.start)
  }
  starts:Date;
  ends:Date;
  comments;
  edits(){
    this.starts = this.editform.value.startdate,
    this.ends = this.editform.value.enddate,
    this.comments = this.editform.value.comment
  }
  @ViewChild("addvacation") addvacation: TemplateRef<any>;
  addvacations() {
   
    this.modalService.open(this.addvacation, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
 
  ngOnInit(): void {
   
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  todaysDate :Date = new Date();
  hoverevent(currentdate,dayevents){
    if( dayevents.find(e => currentdate.getDate() == e.start.getDate() &&  currentdate.getMonth() == e.start.getMonth() &&  currentdate.getYear() == e.start.getYear()))
    // console.log(currentdate , dayevents[0].start);
    return false;
    else{
      if( currentdate > this.todaysDate){
     
        return true;
      }

      else{
        return false;
      }
    }
  }
  @ViewChild('deleteContent') deleteContent: TemplateRef<any>;
 deleteBanking() {
  this.dialogService.open(this.deleteContent );
 
}
requestForm
@ViewChild('vacationaddConfirmation') vacationaddConfirmation: TemplateRef<any>;

vacationadd() {
  this.dialogService.open(this.vacationaddConfirmation);
 
}
@ViewChild('addConfirmation') addConfirmation: TemplateRef<any>;

vacationsadd() {
  this.dialogService.open(this.addConfirmation);
 
}
@ViewChild('vacationeditConfirmation') vacationeditConfirmation: TemplateRef<any>;

vacationedit() {
  this.dialogService.open(this.vacationeditConfirmation);
 
}

re

   tab;
  setTab($event){
   this.tab=$event;
  }

  upcoming(){
    this.dates;
    for(let j = 0; j < this.events.length; j++){
      this.dates = this.events[j].start;
      if(this.dates>this.todaysDate){
        console.log(this.dates)
        return this.dates;
      }
    }
  }
 
}

