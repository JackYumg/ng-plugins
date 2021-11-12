import { Component, Input, OnInit } from '@angular/core';
import { ModalRef } from '../modal.data';

@Component({
  selector: 'div[lib-main-modal-footer]',
  exportAs: 'MibMainModalFooter',
  templateUrl: './main-modal-footer.component.html',
  styleUrls: ['./main-modal-footer.component.css']
})
export class MainModalFooterComponent implements OnInit {

  @Input()
  modalRef?: ModalRef;
  constructor() { }

  ngOnInit(): void {
  }

}
