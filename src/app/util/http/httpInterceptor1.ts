// angular 2.0+ 默认的 Content-Type= application/json


import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, of, catchError, map, mergeMap, tap, finalize} from "rxjs";
import {Router} from "@angular/router";
import {UtilService} from "../../service/util.service";

@Injectable()

export class HttpInterceptor1 implements HttpInterceptor {
  constructor(private util: UtilService,
              private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 拦截请求体，加上5个公共参数
    const basereqobj = req.body;
    const reqobj = (basereqobj === null) ? {} : basereqobj;
    // 把五个公共请求参数加入进去
    //const msgId = Math.floor(Math.random() * Math.pow(10, 10)); // 消息id号，唯一
    // const transChannel = "web";  // 交易通道
    // const channelSerialNo = msgId;    //通道流水号 唯一
    //const channelTime = this.util.toYMDHMSstring(false); //通道时间   2020-02-19 11:12:30
    // const clientIp = "192.168.1.145";  // web所在的客户端的ip
    // reqobj["msgId"] = msgId;
    // reqobj["transChannel"] = transChannel;
    // reqobj["channelSerialNo"] = channelSerialNo;
    // reqobj["channelTime"] = channelTime;
    // reqobj["clientIp"] = clientIp;
    console.log("------url------", req.url);
    console.log(reqobj)
    // 请求头部 拦截，处理加密和 token
    let header = new HttpHeaders().set("Content-Type", "application/json;charset=UTF-8");
    const url = req.url;
    if (url.indexOf("token/getSinkey") == -1) {
      //请求sinkey的接口，不需要对参数加密
      //请求sinkey的接口，不需要token校验
      //####除了 请求sinkey的接口，都需要对请求参数加密
      const sinkey = this.util.getSinkey();
      header = header.set("xc_client_sessionid", sinkey);
      header = header.set("Content-Signature", this.util.getSignReqobj(sinkey, JSON.stringify(reqobj)));
      if (url.indexOf("token/login") == -1) {
        //登入接口（获取token)，不需要token校验
        //########除了 登入接口， 都需要token校验
        const access_token = this.util.getToken();
        header = header.set("xc_sso_sessionid", access_token);
        header = header.set("Authorization", `Bearer ${access_token}`);
      }
    }
    // 如果是 application/json  body:  req.body
    // 如果是  application/x-www-form-urlencoded  param: req.param
    const authReq = req.clone({
      url, headers: header, body: reqobj
    });
    // 响应拦截处理
    const started = Date.now();
    let ok: string;
    return next.handle(authReq).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
        },
        // Operation failed; error is an HttpErrorResponse
        error: (error) => {
          ok = 'failed';
        }
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(msg);
      }),
      map((resp: any) => {
        if (resp.type) {
          const httpstatus = resp.status;
          if (httpstatus === 200) {
            // http 请求状态码是 200
            const respbody = resp.body;
            const {status, data} = respbody;
            if (status == 'success') {
              resp.body = respbody; // resp.body  ==== subscribe(resp)
            } else if (status == "fail_change") {
              //请求内容被篡改后端没模拟状态吗
              this.util.signOut()
            } else if (status == "fail_express") {
              //token失效后端没模拟状态码
              this.util.signOut()
            }
          }
        }
        return resp;
      }),
      catchError((err: HttpErrorResponse) => {
        // http 请求状态码不是 200
        return this.handleData(err);
      })
    )
  }

  handleData(event: HttpErrorResponse | HttpResponse<any>): Observable<any> {
    const status = event.status;
    const statusText = event.statusText;
    const errorRequstUrl = event.url;
    if (status == 401) {
      console.log(errorRequstUrl, status + ":" + statusText);
    } else if (status == 403) {
      // token 失效 跳转到 登入页面
      console.log(errorRequstUrl, status + ":" + statusText);
      this.router.navigate(["/login"]);
    } else if (status == 500) {
      console.log(errorRequstUrl, status + ":" + statusText);
    }
    return of([]);
  }
}






















