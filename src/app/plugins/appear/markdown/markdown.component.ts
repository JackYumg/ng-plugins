import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';
import { HttpService } from './../../../shared/service/http.service';
const text = `
1. 232323
2. 23232323
3. 23232323
`;
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

  value = text;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void{
    console.log(this);
  }


}
