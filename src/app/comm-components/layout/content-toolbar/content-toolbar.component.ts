import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {BreadCrumb, EmitterObj, LoginObj} from "../../../model/author.mode";
import {sessionStorageService} from "../../../service/sessionStorage.service";
import {UtilService} from "../../../service/util.service";
import {Router} from "@angular/router";
import {BreadCrumbService} from "../../../service/bread-crumb.service";

@Component({
  selector: 'app-content-toolbar',
  templateUrl: 'content-toolbar.component.html',
  styleUrls: ["content-toolbar.component.less"]
})
export class ContentToolbarComponent implements OnInit {
  sliderclose: boolean = false;// 左侧菜单是否收起来
  userobj: LoginObj;
  dropItemDatas: any;
  breadCrumbList: BreadCrumb[] = [];
  @Output() sliderCollsp: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sessionService: sessionStorageService,
              private util: UtilService,
              private router: Router,
              private breadcrumbService: BreadCrumbService) {
    this.userobj = this.sessionService.getObj('user') as LoginObj;
    const name = this.util.daesString(this.userobj.username);
    this.userobj.username = name;
    this.dropItemDatas = [{
      label: "修改密码",
      value: 'update_pwd'
    }, {
      label: '退出',
      value: 'signOut'
    }];
    this.breadCrumbList = this.breadcrumbService.getBreadCrumbs();
    this.util.emitter.subscribe((resp: EmitterObj) => {
      const {type} = resp;
      if (type == "update_breadcrumb") {
        console.log('---路由切换更新后的面包屑', this.breadCrumbList);
        this.breadCrumbList = this.breadcrumbService.getBreadCrumbs();
      }
    });
  }

  ngOnInit() {
  }

  sliderMenuToggle() {
    this.sliderclose = !this.sliderclose;
    this.sliderCollsp.emit(this.sliderclose);
  }

  handle(dropitem: any): void {
    switch (dropitem.value) {
      case 'update_pwd':
        break;
      case 'signOut':
        this.util.signOut();
        break;
    }
  }

  breadCumbHandle(routepath: string): void {
    if (!routepath) {
      return
    }
    this.router.navigate([routepath])
  }
}
