import { EventEmitter, Injectable } from '@angular/core';
import { defualtToolbars, NgMarkedEditorOption } from './types/editor';
const defaultOption: NgMarkedEditorOption = {
  saveOption: {
    autoSave: false,
  },
  toolbars: defualtToolbars,
  customUpload: true
};
@Injectable()
export class NgMarkedEditorService {
  constructor() { }
  private optionValue?: NgMarkedEditorOption;
  // 点击确认后传输数据
  fileUploadEvent: EventEmitter<any> = new EventEmitter();
  // 自定义上传时，把文件传出去
  beforeUploadEvent: EventEmitter<File> = new EventEmitter();
  // 自定义上传时，把成功上传文件的路径传到弹框里面
  afterUploadEvent: EventEmitter<string> = new EventEmitter();
  resizeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  setOption(option: NgMarkedEditorOption): void {
    this.optionValue = option || this.getDefaultOption();
  }

  getOption(): NgMarkedEditorOption {
    return this.optionValue || this.getDefaultOption();
  }

  getDefaultOption(): NgMarkedEditorOption {
    return defaultOption;
  }
}
