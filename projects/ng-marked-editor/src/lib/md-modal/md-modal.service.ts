import { ComponentRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, ComponentType } from '@angular/cdk/portal';
@Injectable({
  providedIn: 'root'
})
export class MdModalService {

  refs: OverlayRef[] = [];
  constructor(
    private overlay: Overlay
  ) { }

  create(component: ComponentType<any> | TemplateRef<any> | ViewContainerRef | any, parentContainer?: ViewContainerRef): OverlayRef | null {
    if (component instanceof TemplateRef && parentContainer) {
      const tpp = new TemplatePortal(component, parentContainer, '');
      const ref = this.overlay.create({});
      this.refs.push(ref);
      return ref;
    } else {
      const cmm = new ComponentPortal(component);
      (cmm as any).title = '11';
      const ref = this.overlay.create({
        hasBackdrop: true,
        disposeOnNavigation: true
      });
      ref.attach(cmm);
      this.refs.push(ref);
      return ref;
    }
  }

  closeAll(): void {
    this.refs.forEach((res) => {
      res.dispose();
    });
    this.refs = [];
  }
}
