import { MainModalDirective } from './main-modal.directive';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { ModalOptions, SafeAny } from './modal.data';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { nzModalAnimations } from './modal-animations';

@Component({
  selector: 'lib-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.less'],
  animations: [
    nzModalAnimations.modalContainer
  ],
  host: {
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
  }
})
export class MainModalComponent extends MainModalDirective implements OnInit {

  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet!: CdkPortalOutlet;
  @ViewChild('modalElement', { static: true })
  modalElementRef!: ElementRef<HTMLDivElement>;

  constructor(
    private overlay: Overlay,
    protected elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    public cdr: ChangeDetectorRef,
    protected overlayRef: OverlayRef,
    protected render: Renderer2,
    public config: ModalOptions,
    @Optional() @Inject(DOCUMENT) document: SafeAny,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationType: string
  ) {
    super(elementRef, focusTrapFactory, cdr, render, overlayRef, config);
    this.setType(animationType);
    this.setDoc(document);
  }

  ngOnInit(): void {
  }

}
