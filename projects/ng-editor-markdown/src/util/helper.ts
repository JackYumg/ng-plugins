import { Injectable } from '@angular/core';
import { StringfiyService } from './stringfiy.service';

type IESection = {
    createRange: () => any;
};

type Documents = {
    createTextRange: () => any;
    selection: Selection & IESection
};

const doc: Documents | Document = document;
@Injectable({
    providedIn: 'root'
})
export class MarkdownHelper {
    constructor(
        private stringfiyService: StringfiyService
    ) {

    }
    // 字符位置
    getTextAreaPos(el: HTMLTextAreaElement) {
        let range, textRange, duplicate;
        el.focus();
        if (el.selectionStart) {
            return el.selectionStart;
        } else if ((doc as any).selection) { // IE
            range = (doc as any).selection.createRange();
            if (range == null) { return el.value.length; }
            textRange = (el as any).createTextRange();
            duplicate = textRange.duplicate();
            textRange.moveToBookmark(range.getBookmark());
            duplicate.setEndPoint('EndToStart', textRange);
            return duplicate.text.length;
        }
    }

    getTextLinenum(str: string, el: HTMLElement) {
        const ed = str.split('\n');
        const fontSize = this.getFontSize(el);
        let lineNum = 0;
        for (const e of ed) {
            if (e && e.trim()) {
                lineNum += this.stringfiyService.countChartLength(e, el.clientWidth, Number(fontSize));
            }
        }
        return ed.length + lineNum;
    }

    getTextAreaRowNum(el: HTMLTextAreaElement) {
        let range, textRange, duplicate;
        let index = 0;
        el.focus();
        if (el.selectionStart) {
            index = el.selectionStart;
        } else if ((doc as any).selection) { // IE
            range = (doc as any).selection.createRange();
            if (range == null) { return el.value.length; }
            textRange = (el as any).createTextRange();
            duplicate = textRange.duplicate();
            textRange.moveToBookmark(range.getBookmark());
            duplicate.setEndPoint('EndToStart', textRange);
            index = duplicate.text.length;
        }
        const ed = el.value.substring(0, index).split('\n');
        const fontSize = this.getFontSize(el);
        let lineNum = 0;
        for (const e of ed) {
            if (e && e.trim()) {
                lineNum += this.stringfiyService.countChartLength(e, el.clientWidth, Number(fontSize));
            }
        }
        return ed.length + lineNum;
    }

    textSelect(textarea: any, start: number, end: number) {
        if (textarea.setSelectionRange) {
            textarea.setSelectionRange(start, end);
        } else if (textarea.createTextRange) {
            let rang = textarea.createTextRange();
            rang.collapse(true);
            rang.moveStart('character', start);
            rang.moveEnd('character', end - start);
            rang.select();
        }
    }

    getSelected(textarea: any) {
        if (textarea.selectionStart) {
            return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        } else if ((document as any).selection) {
            return (document as any).selection.createRange().text;
        }
    }

    getFontSize(el: HTMLElement): string {
        if (el.style.fontSize) {
            return el.style.fontSize;
        } else if (el.parentElement) {
            return this.getFontSize(el.parentElement);
        } else {
            return '16';
        }
    }
}

