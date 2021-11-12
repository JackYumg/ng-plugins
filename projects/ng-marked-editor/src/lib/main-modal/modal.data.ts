

import { Direction } from '@angular/cdk/bidi';
import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { MainModalDirective } from './main-modal.directive';

export abstract class ModalLegacyAPI<T, R> {
    abstract afterOpen: Observable<void>;
    abstract afterClose: Observable<R>;

    abstract close(result?: R): void;
    abstract destroy(result?: R): void;

    /**
     * Trigger the OnOk/OnCancel by manual
     */
    abstract triggerOk(): void;
    abstract triggerCancel(): void;
    /**
     * Return the component instance of Content when specify Content as a Component
     */
    abstract getContentComponent(): T | void;

    /**
     * Get the dom element of this Modal
     */
    abstract getElement(): HTMLElement | void;
}

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;
const noopFun = () => void 0;


export const enum ModalState {
    OPEN,
    CLOSING,
    CLOSED
}

export interface StyleObjectLike {
    [key: string]: string;
}

export class ModalOptions<T = SafeAny, R = SafeAny> {
    modalParams?: Partial<T>;
    closeOnNavigation?: boolean; // 路由导航改变时关闭
    direction?: Direction;
    mask?: boolean;
    viewContainerRef?: ViewContainerRef;

    afterOpen?: EventEmitter<void>;
    afterClose?: EventEmitter<R>;

    cancelLoading ?= false;
    okLoading ?= false;
    keyboard ?= true;

    onOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;
    onCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;

    maskStyle?: StyleObjectLike;
    maskClosable?: boolean;
    zIndex ?= 1000;
    content?: any;
    footer?: any;
    className?: string;

    closable?: boolean;
    bodyStyle?: { [key: string]: string };

    width?: number | string;
    style?: any;
    title?: string;
    autofocus?: boolean;
    noAnimation?: boolean;
}

export class ModalRef<T = SafeAny, R = SafeAny> implements ModalLegacyAPI<T, R> {
    componentInstance: T | null = null;
    result?: R;
    state: ModalState = ModalState.OPEN;
    afterClose: Subject<R> = new Subject();
    afterOpen: Subject<void> = new Subject();

    private closeTimeout?: any;

    constructor(
        private overlayRef: OverlayRef,
        private config: ModalOptions,
        public containerInstance: MainModalDirective
    ) {
        containerInstance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === 'done' && event.toState === 'enter'),
                take(1)
            )
            .subscribe(() => {
                this.afterOpen.next();
                this.afterOpen.complete();
                if (config.afterOpen instanceof EventEmitter) {
                    config.afterOpen.emit();
                }
            });

        containerInstance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === 'done' && event.toState === 'exit'),
                take(1)
            )
            .subscribe(() => {
                clearTimeout(this.closeTimeout as unknown as number);
                this._finishDialogClose();
            });

        containerInstance.containerClick.pipe(take(1)).subscribe(() => {
            const cancelable = !this.config.cancelLoading && !this.config.okLoading;
            if (cancelable) {
                this.trigger(TriggerAction.CANCEL);
            }
        });

        overlayRef
            .keydownEvents()
            .pipe(
                filter(
                    event =>
                        (this.config.keyboard as boolean) &&
                        !this.config.cancelLoading &&
                        !this.config.okLoading &&
                        event.keyCode === ESCAPE &&
                        !hasModifierKey(event)
                )
            )
            .subscribe(event => {
                event.preventDefault();
                this.trigger(TriggerAction.CANCEL);
            });

        containerInstance.cancelTriggered.subscribe(() => this.trigger(TriggerAction.CANCEL));

        containerInstance.okTriggered.subscribe(() => this.trigger(TriggerAction.OK));

        overlayRef.detachments().subscribe(() => {
            this.afterClose.next(this.result);
            this.afterClose.complete();
            if (config.afterClose instanceof EventEmitter) {
                config.afterClose.emit(this.result);
            }
            this.componentInstance = null;
            this.overlayRef.dispose();
        });
    }

    getContentComponent(): T {
        return this.componentInstance as T;
    }

    getElement(): HTMLElement {
        return this.containerInstance.getNativeElement();
    }

    destroy(result?: R): void {
        this.close(result);
    }

    triggerOk(): Promise<void> {
        return this.trigger(TriggerAction.OK);
    }

    triggerCancel(): Promise<void> {
        return this.trigger(TriggerAction.CANCEL);
    }

    close(result?: R): void {
        if (this.state !== ModalState.OPEN) {
            return;
        }
        this.result = result;
        this.containerInstance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === 'start'),
                take(1)
            )
            .subscribe(event => {
                this.overlayRef.detachBackdrop();
                this.closeTimeout = setTimeout(() => {
                    this._finishDialogClose();
                }, event.totalTime + 100);
            });

        this.containerInstance.startExitAnimation();
        this.state = ModalState.CLOSING;
    }

    updateConfig(config: ModalOptions): void {
        Object.assign(this.config, config);
        this.containerInstance.bindBackdropStyle();
        this.containerInstance.cdr.markForCheck();
    }

    getState(): ModalState {
        return this.state;
    }

    getConfig(): ModalOptions {
        return this.config;
    }

    getBackdropElement(): HTMLElement | null {
        return this.overlayRef.backdropElement;
    }

    private async trigger(action: TriggerAction): Promise<void> {
        const trigger = { ok: this.config.onOk, cancel: this.config.onCancel }[action];
        const loadingKey = { ok: 'okLoading', cancel: 'cancelLoading' }[action] as 'okLoading' | 'cancelLoading';
        const loading = this.config[loadingKey];
        if (loading) {
            return;
        }
        if (trigger instanceof EventEmitter) {
            trigger.emit(this.getContentComponent());
        } else if (typeof trigger === 'function') {
            const result = trigger(this.getContentComponent());
            if (isPromise(result)) {
                this.config[loadingKey] = true;
                let doClose: boolean | void | {} = false;
                try {
                    doClose = await result;
                } finally {
                    this.config[loadingKey] = false;
                    this.closeWhitResult(doClose);
                }
            } else {
                this.closeWhitResult(result);
            }
        }
    }

    private closeWhitResult(result: SafeAny): void {
        if (result !== false) {
            this.close(result);
        }
    }

    _finishDialogClose(): void {
        this.state = ModalState.CLOSED;
        this.overlayRef.dispose();
    }
}

export function applyConfigDefaults(config: ModalOptions, defaultOptions: ModalOptions): ModalOptions {
    return { ...defaultOptions, ...config };
}

export type SafeAny = any;

export function getValueWithConfig<T>(
    userValue: T | undefined,
    configValue: T | undefined,
    defaultValue: T
): T | undefined {
    return typeof userValue === 'undefined'
        ? typeof configValue === 'undefined'
            ? defaultValue
            : configValue
        : userValue;
}

export function isPromise<T>(obj: SafeAny): obj is Promise<T> {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}


export const MODAL_MASK_CLASS_NAME = 'default-modal';

export const enum TriggerAction {
    CANCEL = 'cancel',
    OK = 'ok'
}

export function isNotNil<T>(value: T): value is NonNullable<T> {
    return typeof value !== 'undefined' && value !== null;
}

export function setContentInstanceParams<T>(instance: T, params: Partial<T> | undefined): void {
    Object.assign(instance, params);
}

export function throwModalContentAlreadyAttachedError(): never {
    throw Error('Attempting to attach modal content after content is already attached');
}

export const ZOOM_CLASS_NAME_MAP = {
    enter: 'zoom-enter',
    enterActive: 'zoom-enter-active',
    leave: 'zoom-leave',
    leaveActive: 'zoom-leave-active'
};

export const FADE_CLASS_NAME_MAP = {
    enter: 'fade-enter',
    enterActive: 'fade-enter-active',
    leave: 'fade-leave',
    leaveActive: 'fade-leave-active'
};

export function getElementOffset(elem: HTMLElement): { top: number; left: number } {
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }

    const rect = elem.getBoundingClientRect();
    const win: any = elem.ownerDocument?.defaultView;
    return {
        top: rect.top + win?.pageYOffset,
        left: rect.left + win?.pageXOffset
    };
}
