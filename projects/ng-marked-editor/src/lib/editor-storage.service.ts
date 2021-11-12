import { EventEmitter, Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { audit } from 'rxjs/operators';

@Injectable()
export class EditorStorageService {

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
    localStorage.setItem(`savePath_${this.config.appkey}`, value);
  }

  destory(): void {
    localStorage.removeItem(`savePath_${this.config.appkey}`);
  }

  saveImidet(value: string): void {
    this.save(value);
  }

  clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (/^savePath/.test(key)) {
        localStorage.removeItem(key);
      }
    });
  }
}
