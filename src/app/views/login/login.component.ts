import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../service/util.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {LoginObj} from "../../model/author.mode";
import {FormVaildatorService} from "../../service/formVaildator.service";
import {ElMessageService} from "element-angular";
import {sessionStorageService} from "../../service/sessionStorage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  autoH: string = "0px";
  loginform: FormGroup;
  validatorE:FormVaildatorService;

  constructor(private util: UtilService,
              private auth: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private validator: FormVaildatorService,
              private message: ElMessageService,
              private sessionService: sessionStorageService) {
    //login form的自动高度
    const {w, h} = util.getWindowSize();
    this.autoH = `${h - 20}px`;
    //响应式表单
    this.loginform = this.fb.group({
      name: ["", [this.validator.requiredValidator()]],
      pwd: ["", [this.validator.requiredValidator()]]
    });
     this.validatorE = this.validator;
    //获取singkey
    this.getSinkey();
  }

  ngOnInit(): void {
  }




  getSinkey() {
    this.auth.getSin_Key().subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        const sinkey = data.sinkey;
        this.util.setSinkey(sinkey);
        this.sessionService.setItem("sinkey", sinkey);
      }
    })
  }

  login(): void {
    //验证表单的有效性
    let valid = true;
    for (let control in this.loginform.controls) {
      const status = this.loginform.controls[control].hasError('status') ? this.loginform.controls[control].errors?.['status'] : '';
      if (status == 'error') {
        valid = false;
      }
    }
    if (!valid) {
      for (let control in this.loginform.controls) {
        this.loginform.controls[control].markAsDirty();
      }
      return
    }

    const form = this.loginform.getRawValue();
    const userName = form.name;
    const pwd = form.pwd;
    const reqobj = new Object() as LoginObj;
    reqobj.username = this.util.aesString(userName);
    reqobj.pwd = this.util.aesString(pwd);
    this.auth.login(reqobj).subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        const token = data.token;
        this.util.setToken(token);
        this.sessionService.setItem("token", token);
        this.sessionService.setObj('user', reqobj);
        this.router.navigate(["/sys/table"]);
      } else {
        this.message.error(data.err)
      }
    });
  }

  // login2(): void {
  //   //验证表单的有效性
  //   let valid = this.loginform.valid;
  //   if (!valid) {
  //     for (let control in this.loginform.controls) {
  //       this.loginform.controls[control].markAsDirty();
  //       this.loginform.controls[control].markAllAsTouched();
  //     }
  //     return
  //   }
  //   const form = this.loginform.getRawValue();
  //   const userName = form.name;
  //   const pwd = form.pwd;
  //   const reqobj = new LoginObj();
  //   reqobj.username = this.util.aesString(userName);
  //   reqobj.pwd = this.util.aesString(pwd);
  //   this.auth.login(reqobj).subscribe((resp) => {
  //     const {token} = resp;
  //     this.util.setToken(token);
  //     //跳转
  //     this.router.navigate(["/sys/user"]);
  //   });
  // }
}
