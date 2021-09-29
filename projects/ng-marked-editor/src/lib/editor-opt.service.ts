import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class EditorOptService {

  private elm?: ElementRef;
  fnMap = {
    'fullScreen-exit': 'fullScreenExit'
  };
  constructor() { }

  setElm(elm: ElementRef): void {
    this.elm = elm;
  }

  // 全屏与退出全屏
  fullScreen = (): void => {
    const element: any = this.elm?.nativeElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  fullScreenExit = (): void => {
    const element: any = this.elm?.nativeElement;
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.msExitFullscreen) {
      element.msExitFullscreen();
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    }
  }

}
