import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringfiyService {

  constructor() { }

  // 计算 字符串长度，后面再优化
  countChartLength(text: string, width: number, fontsize: number) {
    let length = 0;
    Array.from(text).map((char) => {
      if (char.charCodeAt(0) > 255) {//字符编码大于255，说明是双字节字符
        length += 2;
      } else {
        length++;
      }
    });
    if ((length * fontsize / 2) > width) {
      const num = -~(length * fontsize / width / 2);
      return num - 1;
    } else {
      return 0;
    }
  }
}
