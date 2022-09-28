import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormVaildatorService} from "../../../../service/formVaildator.service";
import {ActivatedRoute} from "@angular/router";
import {TabRouterService} from "../../../../service/tab-router.service";
import {SysService} from "../../../../service/sys.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userid: string;
  userForm: FormGroup;
  validatorE: any;
  rolelist: { label: string, value: string }[] = [];

  constructor(private vaildator: FormVaildatorService,
              private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private tabRouterService: TabRouterService,
              private sysService: SysService) {
    this.userid = this.activeRoute.snapshot.queryParamMap.get("userid");
    this.validatorE = this.vaildator;
    this.userForm = this.fb.group({
      name: ["", [this.vaildator.requiredValidator()]],
      rolelist: [null, [this.vaildator.requiredArrayValidator()]]
    })
  }

  ngOnInit(): void {
    this.getroles();
  }

  getroles(): void {
    this.sysService.getAllroles().subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        this.rolelist = data.list ? data.list : [];
      } else {
        this.rolelist = [];
      }
    });
  }

  back(): void {
    this.tabRouterService.closeTab('/sys/user')
  }

  handRole(): void {
    let valid = true;
    for (let control in this.userForm.controls) {
      const status = this.userForm.controls[control].hasError('status') ? this.userForm.controls[control].errors?.['status'] : '';
      if (status == 'error') {
        valid = false;
      }
    }
    if (!valid) {
      for (let control in this.userForm.controls) {
        this.userForm.controls[control].markAsDirty();
      }
      return
    }
    const form = this.userForm.getRawValue();
    console.log(form);
    if (this.userid == '-1') {
      //添加
    } else {
      //编辑
    }

  }

}
