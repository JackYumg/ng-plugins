import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const nzModalAnimations: {
    readonly modalContainer: AnimationTriggerMetadata;
} = {
    modalContainer: trigger('modalContainer', [
        state('void, exit', style({})),
        state('enter', style({})),
        transition('* => enter', animate('.24s', style({}))),
        transition('* => void, * => exit', animate('.2s', style({})))
    ])
};
