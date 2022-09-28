import {Component, OnInit} from "@angular/core";

@Component({
  selector:'app-content-footer',
  templateUrl:'content-footer.component.html',
  styleUrls:["content-footer.component.less"]
})
export  class ContentFooterComponent implements OnInit{
  footermsg:string="angular+element-angular 前端开发框架";
  constructor() {
  }
  ngOnInit() {
  }
}
