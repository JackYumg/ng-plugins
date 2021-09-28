import { Injectable } from '@angular/core';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
import * as katex from 'katex';
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

const escapeReplacements: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch: string) => escapeReplacements[ch];
function escape(html: string, encode: boolean): string {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

@Injectable({
  providedIn: 'root'
})
export class MarkBaseService {

  private markInstance = marked;
  private baseOption = {

  };

  // 默认扩展了的渲染器
  private defaultRender = {
    code: (text: string, infostring: string) => {
      const lang = ((infostring || '').match(/\S*/) || [])[0] || '';
      const e: string = hljs.default.highlightAuto(text, [lang]).value;
      return `<pre class="language-${lang}"><code >${e}</code>${this.copyCode}</pre>`;
    },
    text: (text: string) => {
      const match = text.match(/^\$[\s|\S]+\$$/);
      if (match) {
        text = match[0].split(/^[\$]+|[\$]+$/).join('').split('\n').join('');
        const html = katex.renderToString(text, { throwOnError: false });
        return html;
      }
      return text;
    }
  };

  // 默认扩展了的解析器
  private defaultTokenizer = {
    inlineText: (src: string) => {
      const match = src.match(/^\$[\s|\S]+\$$/);
      if (match) {
        return {
          type: 'text',
          raw: match[0],
          text: src
        };
      }
      return false;
    }
  };


  copyCode = this.addCopyCode();
  // 默认自己加一个代码编译函数
  constructor() {
    this.useRender(this.defaultRender);
    this.useToken(this.defaultTokenizer);
  }

  private addCopyCode(): string {
    return ` <span class="code-copy">复制代码</span>`;
  }

  // 以下是开放给用户的接口

  toHtml(context: string = ''): string {
    return this.markInstance(context , this.baseOption);
  }

  useRender(renderer: any): void {
    this.markInstance.use({ renderer: { ...this.defaultRender, ...renderer } });
  }

  useToken(tokenizer: any): void {
    this.markInstance.use({ tokenizer: {...this.defaultTokenizer , ...tokenizer} });
  }
}
