import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {RoleSearchForm, UserSearchForm} from "../model/searchForm.mode";


//局部服务，需要提供服务供应商
@Injectable()
export class SysService {
  constructor(
    private httpClient: HttpClient) {
  }

  getMenus(): Observable<any> {
    return this.httpClient.post<any>(environment.system + '/getmenus', null);
  }

  getRoles(params: RoleSearchForm): Observable<any> {
    return this.httpClient.post<any>(environment.system + '/getroles', params);
  }

  getAllroles(): Observable<any> {
    return this.httpClient.post<any>(environment.system + '/getAllroles', null);
  }

  getUsers(params: UserSearchForm): Observable<any> {
    return this.httpClient.post<any>(environment.system + '/getusers', params);
  }
}
