import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgMarkedEditorService {

  constructor() { }

  fileUploadEvent: EventEmitter<any> = new EventEmitter();
  resizeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
}
