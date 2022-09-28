import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormVaildatorService} from "../../../../service/formVaildator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TabRouterService} from "../../../../service/tab-router.service";


@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit {
  menuForm: FormGroup;
  validatorE: FormVaildatorService;
  menuLevals: { label: string, value: string }[] = [];
  menuId: string;   //-1 添加 ， 其他修改
  parentMenuId: string;


  constructor(private fb: FormBuilder,
              private validator: FormVaildatorService,
              private router: Router,
              private tabRouterService: TabRouterService,
              private activeRoute: ActivatedRoute) {
    this.parentMenuId = this.activeRoute.snapshot.paramMap.get('newnodeParentId');
    this.menuId = this.activeRoute.snapshot.paramMap.get('menuid');
    //响应式表单
    this.menuForm = this.fb.group({
      leval: ["", [this.validator.requiredValidator()]],
      name: ["", [this.validator.requiredValidator()]],
      icon: [""],
      routepath: [""],
    });
    this.validatorE = this.validator;
    this.menuLevals = [{
      label: "一级菜单",
      value: '1'
    }, {
      label: "二级菜单",
      value: "2"
    }, {
      label: "非菜单页面",
      value: "3"
    }]
  }

  ngOnInit(): void {
  }

  levalChange(menuitem: { label: string, value: string }): void {
    console.log(menuitem);
  }

  back(): void {
    this.tabRouterService.closeTab('/sys/menu')
  }

  handMenu(): void {
    let valid = true;
    for (let control in this.menuForm.controls) {
      const status = this.menuForm.controls[control].hasError('status') ? this.menuForm.controls[control].errors?.['status'] : '';
      if (status == 'error') {
        valid = false;
      }
    }
    if (!valid) {
      for (let control in this.menuForm.controls) {
        this.menuForm.controls[control].markAsDirty();
      }
      return
    }
    const form = this.menuForm.getRawValue();
    console.log(form);
    if(this.menuId=='-1'){
      //添加
    }else{
      //编辑
    }

  }

}
