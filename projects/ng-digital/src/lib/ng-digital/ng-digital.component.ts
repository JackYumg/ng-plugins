import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-ng-digital',
  templateUrl: './ng-digital.component.html',
  styleUrls: [
    './ng-digital.component.less'
  ],
  styles: [
  ]
})
export class NgDigitalComponent implements OnInit, OnChanges {

  @ViewChild('contentTpl', { static: true })
  contentRef!: ElementRef;
  @Input()
  count = 0;
  value = 0;
  constructor(
  ) { }

  ngOnInit(): void {

  }

  incress() {
    let timeRanges = 0;
    const itmer = new Date().getTime();
    const elm: HTMLElement = this.contentRef.nativeElement;
    if (this.count === 9) {
      this.count++;
      this.setStyle();
      const newTIme = new Date().getTime();
      timeRanges = newTIme - itmer;
      setTimeout(() => {
        elm.classList.remove('transition');
        this.count = 0;
        this.setStyle();
      }, 100 + (timeRanges));
      return timeRanges;
    } else {
      const finded = Array.from(elm.classList).find(e => e === 'transition');
      if (!finded) {
        elm.classList.add('transition');
      }
      this.count++;
      this.setStyle();
    }
    return timeRanges;
  }

  decress() {
    this.count--;
    if (this.count === -1) {
      this.count = 9;
    }
    this.setStyle();
  }

  private setStyle() {
    const unit = 1 + 0.02 + (20 / 100) * 1;
    const elm: HTMLElement = this.contentRef.nativeElement;
    elm.style.top = -1 * this.count * unit + 'em';
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const timer = Date.now();
    let timeRanges;
    if (simpleChanges.count.previousValue) {
      if (simpleChanges.count.currentValue > simpleChanges.count.previousValue) {
        this.setStyle();
      } else if (simpleChanges.count.currentValue < simpleChanges.count.previousValue) {
        const temp = this.count;
        this.count = 9;
        timeRanges = this.incress();
        const elm: HTMLElement = this.contentRef.nativeElement;
        const tt = Date.now();
        setTimeout(() => {
          elm.classList.add('transition');
          this.count = temp;
          this.setStyle();
        }, 200 + timeRanges + (tt - timer) );
      } else {
        // 什么都不需要做
      }
    } else {
      this.setStyle();
    }
  }

}
