import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BaseConfig } from '../data';
import { ThemeType } from '../ng-marked-editor.component';
import { NgMarkedEditorService } from '../ng-marked-editor.service';
type OptType = 'upload' | 'online' | 'cut';
@Component({
  selector: 'lib-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.less']
})
export class ImageUploadComponent implements OnInit {

  @Input()
  defaultStyle = {
    width: '520px',
  };

  @Input()
  title = '';
  files = [];

  desc = '';
  url = '';
  optType: OptType = 'upload';
  @Input()
  theme: ThemeType = 'default';
  @Input()
  private ngMarkedEditorService?: NgMarkedEditorService;
  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.subscribeEvent();
  }

  subscribeEvent(): void {
    this.ngMarkedEditorService?.afterUploadEvent.subscribe((path: string) => {
      this.url = path;
    });
  }

  fileuploadChange($event: Event): void {
    const { target } = $event;
    this.files = (target as any).files;
  }

  uploadFile(): void {
    const option = this.ngMarkedEditorService?.getOption();
    if (option?.customUpload) {
      this.ngMarkedEditorService?.beforeUploadEvent.emit(this.files[0]);
    } else {
      const url = `${BaseConfig.fileurl}uploadfile?`;
      const formData = new FormData();
      formData.append('file', this.files[0]);
      this.httpClient.post(url, formData, { withCredentials: false }).subscribe((res: any) => {
        if (res.path) {
          this.url = BaseConfig.fileurl + 'getFiles?path=' + res.path;
        }
      });
    }
  }

  confirm(): void {
    this.ngMarkedEditorService?.fileUploadEvent.emit({ path: this.url, desc: this.desc, type: 'image' });
  }

  cancel(): void {
    this.ngMarkedEditorService?.fileUploadEvent.emit({ type: 'cancel' });
  }

  activeTab(type: OptType): void {
    this.optType = type;
  }
}
