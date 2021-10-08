import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
@Component({
  selector: 'lib-md-modal',
  templateUrl: './md-modal.component.html',
  styleUrls: ['./md-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdModalComponent implements OnInit {

  @Input()
  modalStyle = {};

  @Input()
  mdModalTitle?: string | ElementRef;
  @Input('mdModalFooterTpl')
  mdModalFooter?: string | ElementRef;
  constructor(
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
  }
  @HostListener('click', ['$event'])
  onContainerClick(e: MouseEvent): void {
  }
}
