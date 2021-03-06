import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BaseConfig } from '../data';
import { MdModalService } from '../md-modal/md-modal.service';
import { ThemeType } from '../ng-marked-editor.component';
import { NgMarkedEditorService } from '../ng-marked-editor.service';
type OptType = 'upload' | 'online' | 'cut';

@Component({
  selector: 'lib-link-upload',
  templateUrl: './link-upload.component.html',
  styleUrls: ['./link-upload.component.less']
})
export class LinkUploadComponent implements OnInit {


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
    private modalService: MdModalService
  ) { }

  ngOnInit(): void {
  }

  fileuploadChange($event: Event): void {
    const { target } = $event;
    this.files = (target as any).files;
  }

  uploadFile(): void {
    const url = `${BaseConfig.fileurl}uploadfile?`;
    const formData = new FormData();
    formData.append('file', this.files[0]);
    this.httpClient.post(url, formData, { withCredentials: false }).subscribe((res: any) => {
      if (res.path) {
        this.url = BaseConfig.fileurl + 'getFiles?path=' + res.path;
      }
    });
  }

  confirm(): void {
    this.ngMarkedEditorService?.fileUploadEvent.emit({ path: this.url, desc: this.desc, type: 'link' });
    this.modalService.closeAll();
  }

  cancel(): void {
    this.ngMarkedEditorService?.fileUploadEvent.emit({ type: 'cancel' });
  }


  activeTab(type: OptType): void {
    this.optType = type;
  }

}
