import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FileItem } from 'src/app/shared/components/sand-box/sand-box-meta';
import { HttpService } from 'src/app/shared/service/http.service';

@Component({
  selector: 'app-ng-marked-preview',
  templateUrl: './ng-marked-preview.component.html',
  styleUrls: ['./ng-marked-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMarkedPreviewComponent implements OnInit {
  previewText = '';
  fileList: FileItem[] = [
    { name: 'index.html', lang: 'html', content: '<lib-ng-marked-preview [context]="previewText" ></lib-ng-marked-preview>' },
    {
      name: 'index.ts', lang: 'typescript', content: `
      import { Component, OnInit } from '@angular/core';
      @Component({
        selector: 'app-ng-marked-preview',
        templateUrl: './ng-marked-preview.component.html',
        styleUrls: ['./ng-marked-preview.component.less']
      })
      export class NgMarkedPreviewComponent implements OnInit {
        previewText = '# Ng-Marked-Preview';
      }
    ` }
  ];
  @Input()
  set context(value: string) {
    this.previewText = value;
  }

  get context(): string {
    return this.previewText;
  }
  constructor(
    private httpService: HttpService,
    private cdk: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  // 获取预览的md
  getData(): void {
    this.httpService.getText('assets\\doc\\marked.md').subscribe((e: string) => {
      this.previewText = e.trim();
      this.cdk.detectChanges();
    });
  }

}
