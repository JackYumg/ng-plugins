import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';
import { HttpService } from './../../../shared/service/http.service';
const text = `<sub>121212</sub><sup>121212</sup>`
@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.less']
})
export class MarkdownComponent implements OnInit {

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
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getData('assets/doc/test.md').subscribe((res) => {
      console.log(res);
    });
  }

  value = text;

}
