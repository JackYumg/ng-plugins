import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';
const text = `
# NgPlugins

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Development server

Run 'ng serve' for a dev server. Navigate to 'http://localhost:4200/'. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run 'ng generate component component-name' to generate a new component. You can also use 'ng generate directive|pipe|service|class|guard|interface|enum|module'.

## Build

Run 'ng build' to build the project. The build artifacts will be stored in the 'dist/' directory. Use the '--prod' flag for a production build.

## Running unit tests

Run 'ng test' to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run 'ng e2e' to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

| 表列 A | 表列 B |
| - | - |
| 单元 1 | 单元 2 |


## Further help

To get more help on the Angular CLI use 'ng help' or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
`
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
  constructor() { }

  ngOnInit(): void {
  }

  value = text;

}
