import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgMarkedEditorService {

  constructor() { }

  fileUploadEvent: EventEmitter<any> = new EventEmitter();
}
