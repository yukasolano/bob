import { DebugElement } from '@angular/core';

export const ButtonClickEvents = {
    left: { button: 0 }, right: { button: 2 }
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left) {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}

export function setInput(el: any, querySelector: string, value: string) {
    const input = el.querySelector(querySelector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
}
