import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgMarkedEditorOption } from 'projects/ng-marked-editor/src/lib/types/editor';
import { ThemeType } from 'projects/ng-marked-editor/src/public-api';
import { HttpService } from 'src/app/shared/service/http.service';

@Component({
  selector: 'app-ng-marked-editor',
  templateUrl: './ng-marked-editor.component.html',
  styleUrls: ['./ng-marked-editor.component.less']
})
export class NgMarkedEditorComponent implements OnInit {

  theme: ThemeType = 'default';
  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: true
    }
  };
  fg: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private cdk: ChangeDetectorRef
  ) {
    this.fg = this.fb.group({
      text: '# dddd'
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  saveChange(value: string): void {
    console.log(value);
  }

  // 获取预览的md
  getData(): void {
    this.httpService.getText('assets\\example\\marked.md').subscribe((e: string) => {
      this.fg.patchValue({
        text: e
      });
      this.cdk.detectChanges();
    });
  }

  switchTheme(theme: ThemeType): void {
    this.theme = theme;
  }
}
