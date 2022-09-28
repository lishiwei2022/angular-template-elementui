import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormVaildatorService} from "../../../../service/formVaildator.service";
import {TabRouterService} from "../../../../service/tab-router.service";
import {SysService} from "../../../../service/sys.service";
import {Menu} from "../../../../model/slider-menu.mode";

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  roleid: string;
  roleForm: FormGroup;
  validatorE: any;
  menuList: { label: string, value: string, elDisabled: boolean }[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private validator: FormVaildatorService,
              private fb: FormBuilder,
              private tabRouterService: TabRouterService,
              private sysService: SysService) {
    this.validatorE = this.validator;
    this.roleid = this.activeRoute.snapshot.queryParamMap.get('roleid');
    this.roleForm = this.fb.group({
      name: ["", [this.validator.requiredValidator()]],
      menulist: [null, [this.validator.requiredArrayValidator()]]
    });
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void {
    this.sysService.getMenus().subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        const menus: Menu[] = data.list ? data.list : [];
        this.menuList = menus.map((menu) => {
          return {
            label: menu.name,
            value: String(menu.id),
            elDisabled: false
          }
        })
      } else {
        this.menuList = [];
      }
    });
  }

  back(): void {
    this.tabRouterService.closeTab('/sys/role')
  }

  handRole(): void {
    let valid = true;
    for (let control in this.roleForm.controls) {
      const status = this.roleForm.controls[control].hasError('status') ? this.roleForm.controls[control].errors?.['status'] : '';
      if (status == 'error') {
        valid = false;
      }
    }
    if (!valid) {
      for (let control in this.roleForm.controls) {
        this.roleForm.controls[control].markAsDirty();
      }
      return
    }
    const form = this.roleForm.getRawValue();
    console.log(form);
    if (this.roleid == '-1') {
      //添加
    } else {
      //编辑
    }

  }

}
