import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MainModalComponent } from './main-modal.component';
import { MainModalDirective } from './main-modal.directive';
import {
  applyConfigDefaults, getValueWithConfig, isNotNil, ModalOptions,
  ModalRef, MODAL_MASK_CLASS_NAME, SafeAny, setContentInstanceParams
} from './modal.data';
type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable()
export class MainModalService {


  private openModalsAtThisLevel: ModalRef[] = [];
  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openModals(): ModalRef[] {
    return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parentModal;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Optional() private directionality: Directionality,
    @Optional() @SkipSelf() private parentModal: MainModalService,
  ) { }

  // 创建一个模态框
  create<T, R = SafeAny>(config: ModalOptions<T, R>): ModalRef<T> {
    return this.open(config.content as ComponentType<T>, config) as any;
  }

  //
  open<T, R>(componentOrTemplateRef: ContentType<T>, config: ModalOptions): ModalRef<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
    const overlayRef = this.createOverlay(config);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, R>(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
    (modalContainer as any).modalRef = modalRef;
    this.openModals.push(modalRef);
    modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));
    return modalRef;
  }

  private removeOpenModal(modalRef: ModalRef): void {
    const index = this.openModals.indexOf(modalRef);
    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  createOverlay(config: ModalOptions): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: getValueWithConfig(config.closeOnNavigation, true, true),
      direction: getValueWithConfig(config.direction, 'ltr', this.directionality.value)
    });

    if (getValueWithConfig(config.mask, true, true)) {
      overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
    }
    return this.overlay.create(overlayConfig);
  }

  attachModalContainer(overlayRef: OverlayRef, config: ModalOptions): MainModalDirective {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: ModalOptions, useValue: config }
      ]
    });

    const ContainerComponent = MainModalComponent;
    const containerPortal = new ComponentPortal<MainModalDirective>(ContainerComponent, config.viewContainerRef, injector);
    const containerRef = overlayRef.attach<MainModalDirective>(containerPortal);
    return containerRef.instance;
  }

  attachModalContent<T, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: MainModalDirective,
    overlayRef: OverlayRef,
    config: ModalOptions<T>
  ): ModalRef<T, R> {
    const modalRef = new ModalRef<T, R>(overlayRef, config, modalContainer);
    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null as any, {
          $implicit: config.modalParams,
          modalRef
        } as SafeAny)
      );
    } else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector(modalRef, config);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector)
      );
      setContentInstanceParams<T>(contentRef.instance, config.modalParams);
      modalRef.componentInstance = contentRef.instance;
    } else {
      modalContainer.attachStringContent();
    }
    return modalRef;
  }

  private createInjector<T, R>(modalRef: ModalRef<T, R>, config: ModalOptions<T>): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this.injector,
      providers: [{ provide: ModalRef, useValue: modalRef }]
    });
  }

  closeAll(): void {
    this.closeModals(this.openModals);
  }

  private closeModals(dialogs: ModalRef[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }
}
