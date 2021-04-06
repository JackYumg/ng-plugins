import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-ng-digital-panel',
  templateUrl: './ng-digital-panel.component.html',
  styleUrls: ['./ng-digital-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgDigitalPanelComponent implements OnInit, OnChanges {

  @Input()
  data = 0;

  dataList: number[] = [];
  sourceData: any[] = [];
  constructor(
    private cdk: ChangeDetectorRef,
  ) {
    this.dataList.length = 30;
    this.dataList.fill(0);
  }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const temp: any[] = [];
    this.data.toFixed().split('').map((e: string) => Number(e)).forEach((e, index, array) => {
      const t = this.dataList.length - (array.length - index);
      this.dataList[t] = e;
      temp.push(e);
    });
    this.sourceData = temp;
    this.cdk.detectChanges();
  }

}
