import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormVaildatorService {
  //#################  angular 同步验证器定义 ##############################
  /**
   * angular的同步验证器---------- 验证器函数的第二个参数(Array)中一个元素。
   * 同一个表单控件对象，可以定义多个同步验证器， 每个同步验证器的错误对象可以设置不同。在html中，可以根据不同的 forbiddenName，取得不同的msg提示信息
   * UI，可以通过css，自定义不同状态的表现效果
   * .ng-valid
   *
   * .ng-invalid
   *
   * .ng-pending
   *
   * .ng-pristine
   *
   * .ng-dirty
   *
   * .ng-untouched
   *
   * .ng-touched
   *
   * .ng-submitted (只对 form 元素添加)
   */
  myvalid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /a/;
      if (!regex.test(value)) {
        //验证不通过，返回验证错误对象
        //forbiddenName 自定义的验证秘钥，用于插入错误信息 {name}
        return {
          forbiddenName: {
            msg: "错误提示信息"
          }
        }
      }
      return null; // 验证通过
    }
  }

  //######### element-angular 验证器定义  ###########
  /**
   * UI, element-angluar已经固化效果
   * loginform.valid 和 loginform.invalid 已经不准确了，因为验证通过应该返回null,而不是 {status: 'success'}错误对象
   * 验证通过返回错误 {status: 'success'}错误对象     一个 ： forbiddenName = status
   * 验证不通过返回 错误  {status: 'error', message: '必填'} 错误对象  二个 ： forbiddenName = status  forbiddenName = message
   * 同步验证器只能写一个了， 因为第一个同步验证器即使通过，返回的也是错误对象 {status: 'success'}， 而不是null,  就被拦截了不会进行进行第二个同步验证器验证了
   */

  requiredValidator(): any {
    return (control: FormControl): any => {
      const value = control.value;
      if (!value) {
        return {status: 'error', message: '必填'}
      }
      return {status: 'success'}
    }
  }

  requiredArrayValidator(): any {
    return (control: FormControl): any => {
      const value = control.value;
      if (!value|| !value.length) {
        return {status: 'error', message: '必填'}
      }
      return {status: 'success'}
    }
  }

  /**
   * 表单控件对象的 UI状态控制
   * error---验证不通过的UI表现
   * success--验证通过的UI表现
   * ''  ----没有变化的UI表现
   * @param item
   */
  statusCtrl(item: string, form: FormGroup): string {
    const control: AbstractControl = form.controls[item];
    if (!control) {
      return ''; //不变化
    }
    if (control.dirty) {
      if (control.hasError('status')) {
        return control.errors?.['status'];
      }
    }
    return ""; //不变化
  }

  /**
   * 显示的错误信息
   * string---显示的错误信息， 返回'',则没有错误信息
   * @param item
   */
  messageCtrl(item: string, form: FormGroup): string {
    const control: AbstractControl = form.controls[item];
    if (!control) {
      return '';
    }
    if (control.dirty) {
      if (control.hasError('message')) {
        return control.errors?.['message'];
      }
    }
    return '';
  }


}
