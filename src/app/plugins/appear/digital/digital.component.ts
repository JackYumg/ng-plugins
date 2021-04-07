import { Component, OnInit } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.less']
})
export class DigitalComponent implements OnInit {

  fileList: FileItem[] = [
    { name: 'index.html', content: `<lib-ng-digital-panel [data]="count"></lib-ng-digital-panel>`, lang: 'html' },
    {
      name: 'index.ts', content: `
    export class DigitalComponent implements OnInit {
      count = 0;
      constructor() {
        console.log(this);
      }
    
      ngOnInit(): void {
        setInterval(() => {
          this.count += 1;
        }, 1000);
      }
    
    }
    ` , lang: 'typescript'
    }
  ];
  count = 0;
  constructor(
    private nzConfigService: NzConfigService
  ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.count += 1;
    }, 1000);
  }

}
