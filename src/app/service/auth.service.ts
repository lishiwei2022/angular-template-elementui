import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {LoginObj} from "../model/author.mode";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

//局部服务，需要提供服务供应商
@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient) {
  }


  //从服务端获取sinkey,用于加密请求数据
  getSin_Key(): Observable<any> {
    return this.httpClient.get<any>(environment.token + '/getSinkey');
  }

  //登入 获取  token
  login(params: LoginObj): Observable<any> {
    return this.httpClient.post<any>(environment.token + '/login', params);
  }

}
