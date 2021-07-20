import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less']
})
export class ColorPickerComponent implements OnInit {

  colorValue = '';
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

  colorChange($event:any){
    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
