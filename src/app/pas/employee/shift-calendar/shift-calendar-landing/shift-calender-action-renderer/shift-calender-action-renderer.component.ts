import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-shift-calender-action-renderer",
  styles: ['svg:hover { fill: #4662A2;}'],
  template: `
    <div class="d-flex align-items-center h-100">
      <svg
        class="mr-4  cursor-pointer"
        routerLink="../shift-schedular"
        id="noun_add_date_3235680"
        data-name="noun_add date_3235680"
        xmlns="http://www.w3.org/2000/svg"
        width="15.254"
        height="15.495"
        viewBox="0 0 15.254 15.495"
      >
        <g
          id="noun_add_date_3235680-2"
          data-name="noun_add date_3235680"
          opacity="0.7"
        >
          <g id="Group_801" data-name="Group 801" transform="translate(0 0)">
            <path
              id="Path_84"
              data-name="Path 84"
              d="M83.208,45.5h0a.679.679,0,0,0-.666-.651H80.374v-.962a.515.515,0,1,0-1.03,0v.962H71.821v-.962a.515.515,0,1,0-1.03,0v.962H68.745a1.007,1.007,0,0,0-.328.033.68.68,0,0,0-.46.649c0,.089,0,.179,0,.268v2.353a.262.262,0,0,0,.258.258H82.351c.192,0,.385,0,.575,0h.024a.262.262,0,0,0,.258-.258V45.5Z"
              transform="translate(-67.956 -43.376)"
            />
            <path
              id="Path_85"
              data-name="Path 85"
              d="M83.208,384.809V376.87a.263.263,0,0,0-.258-.258H68.813c-.192,0-.385,0-.575,0h-.024a.262.262,0,0,0-.258.258v8.569c0,.089,0,.18,0,.27a.678.678,0,0,0,.68.673c.215,0,.431,0,.646,0H82.533a.677.677,0,0,0,.677-.677C83.211,385.406,83.208,385.107,83.208,384.809Zm-5.144-3.038H75.926v2.138a.344.344,0,1,1-.687,0V381.77H73.1a.35.35,0,0,1-.344-.344.347.347,0,0,1,.344-.343h2.138v-2.138a.344.344,0,1,1,.687,0v2.138h2.138a.343.343,0,1,1,0,.687Z"
              transform="translate(-67.956 -370.888)"
            />
          </g>
        </g>
      </svg>

      <i
        class="fa fa-check"
        style="color: green"
        *ngIf="data.status == 'Draft'"
      ></i>
    </div>
  `,
})
export class ShiftCalenderActionRendererComponent implements OnInit {
  constructor() {}

  data;
  params;

  ngOnInit(): void {}

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  // editCashup(){
  //   //console.log("Edit cashup from custom Component");
  //   this.params.context.componentParent.editCashup(this.data.id);

  // }
}
