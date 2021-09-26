import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { HttpService } from '../../service/http.service';
import { FileItem } from './sand-box-meta';
@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.less']
})
export class SandBoxComponent implements OnInit {

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor'`;
  @Input()
  fileList: FileItem[] = [];
  @ViewChild('codeEditorTpl', { static: false })
  codeEditorRef!: NzCodeEditorComponent;
  checkItem!: FileItem;
  codeExpand = false;
  @Input()
  pluginDesc = '';
  @Input()
  pluginDescDetail = '';
  @Input()
  docUrl = 'assets/doc/test.md';

  doc!: string;
  constructor(
    private httpService: HttpService,
    private cdk: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkItem = this.fileList[0];
    this.httpService.getText(this.docUrl).subscribe((res) => {
      this.doc = res;
      this.cdk.detectChanges();
    });
  }

  tabIndexChange($event: NzTabChangeEvent): void {
    const index: any = $event.index;
    this.checkItem = this.fileList[index];
    this.codeEditorRef.layout();
  }

  expand(): void {
    this.codeExpand = !this.codeExpand;
    this.codeEditorRef.layout();
  }
}
