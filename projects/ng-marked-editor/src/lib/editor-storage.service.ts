import { EventEmitter, Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { audit } from 'rxjs/operators';

@Injectable()
export class EditorStorageService {

  localStorage = window.localStorage;
  config = {
    appkey: '',
    timer: 10000 // 默认十秒钟
  };

  saveEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  loadConfig(appkey: string): Promise<boolean> {
    this.config.appkey = appkey;
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  start(): void {
    this.saveEvent.pipe(audit(ev => interval(this.config.timer))).subscribe((value: string) => {
      this.save(value);
    });
  }

  private save(value: string): void {
    this.localStorage.setItem(`savePath_${this.config.appkey}`, value);
  }

  destory(): void {
    this.localStorage.removeItem(`savePath_${this.config.appkey}`);
  }

  saveImidet(value: string): void {
    this.save(value);
  }

  clearAll(): void {
    const keys = Object.keys(this.localStorage);
    keys.forEach((key) => {
      if (/^savePath/.test(key)) {
        this.localStorage.removeItem(key);
      }
    });
  }
}
