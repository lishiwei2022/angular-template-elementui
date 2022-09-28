import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class sessionStorageService {
  private sessionSorage: any;

  constructor() {
    this.sessionSorage = window.sessionStorage;
  }

  setItem(key: string, str: string): void {
    this.sessionSorage.setItem(key, str);
  }

  getItem(key: string): string {
    return this.sessionSorage.getItem(key);
  }

  removeItem(key: string): void {
    this.sessionSorage.removeItem(key);
  }

  setObj(key: string, obj: object): void {
    this.sessionSorage.setItem(key, JSON.stringify(obj));
  }

  getObj(key: string): object {
    return JSON.parse(this.sessionSorage.getItem(key));
  }

  clear(): void {
    this.sessionSorage.clear();
  }

}
