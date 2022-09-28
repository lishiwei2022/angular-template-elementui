import {EventEmitter, Injectable} from "@angular/core";
import CryptoJS from 'crypto-js';
import {EmitterObj} from "../model/author.mode";
import {sessionStorageService} from "./sessionStorage.service";
import {Router} from "@angular/router";

//全局服务，无需提供服务注册商
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private sessionService: sessionStorageService,
              private router: Router) {
  }

  // aes 加解密参数
  private key: string = "7ed0a55691534aa8a9a692d373deeee8";
  private iv: string = "6bSWAnEG/f2onZ7S";
  //HmacSHA1 加密参数  服务端返回
  private sinkey: string = "";  //服务端返回的 HmacSHA1   数据传输加密密钥
  //登入接口返回的token
  private token: string = ""; // 请求token(有时效)
  public emitter: EventEmitter<any> = new EventEmitter<any>();

  //获取浏览器文档窗口尺寸
  getWindowSize() {
    return {
      h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
  }

  /**
   * aes加密
   * @param s----字符串或者json字符串
   */
  aesString(s: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const encrypted = CryptoJS.AES.encrypt(s, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  /**
   * aes 解密
   * @param encrypted---aes加密数据
   */
  daesString(encrypted: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * HmacSHA1 加密
   * @param sinkey
   * @param value
   */
  getSignReqobj(sinkey: string, value: string): any {
    const sha1_result = CryptoJS.HmacSHA1(value, sinkey);
    const result = CryptoJS.enc.Base64.stringify(sha1_result);
    return result;
  }

  getSinkey() {
    return this.sinkey;
  }

  setSinkey(sinkey: string) {
    this.sinkey = sinkey;
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  emitterChange(msg: EmitterObj): void {
    this.emitter.emit(msg);
  }


  signOut(): void {
    this.sessionService.clear();
    this.router.navigate(["/login"]);
  }
}

