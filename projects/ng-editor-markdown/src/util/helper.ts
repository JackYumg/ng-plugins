import { Injectable } from '@angular/core';

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
    // 字符位置
    getTextAreaPos (el: HTMLTextAreaElement) {
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
        const ed = el.value.substring(0 , index).split('\n');
        return ed.length;
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
}

