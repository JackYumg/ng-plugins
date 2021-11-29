import { Injectable } from '@angular/core';
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

const escapeReplacements: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;'
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

  private markInstance = (window as any).marked.marked;
  private baseOption = {

  };
  // 默认扩展了的渲染器
  private defaultRender = {
    code: (text: string, infostring: string) => {
      const { mermaid, hljs } = (window as any);
      const lang = ((infostring || '').match(/\S*/) || [])[0] || '';
      if (lang === 'mermaid') {
        if (mermaid) {
          const id = `theGraph${new Date().getTime()}`;
          const rended = mermaid.mermaidAPI.render(id, text);
          return rended;
        } else {
          return `<pre class="language-${lang}"><code>${text}</code>${this.copyCode}</pre>`;
        }
      } else if (hljs) {
        const e: string = hljs.highlightAuto(text, [lang]).value;
        return `<pre class="language-${lang}"><code>${e}</code>${this.copyCode}</pre>`;
      } else {
        return `<pre class="language-${lang}"><code>${text}</code>${this.copyCode}</pre>`;
      }
    },
    text: (text: string) => {
      const match = text.match(/^\$\$\n[\s|\S]+\n\$\$$/);
      const katex = (window as any).katex;
      if (match && katex) {
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
    return `<span class="code-copy">复制代码</span>`;
  }

  // 以下是开放给用户的接口

  toHtml(context: string = ''): string {
    if (this.markInstance.marked) {
      return this.markInstance.marked(this.baseOption);
    } else {
      return this.markInstance(context, this.baseOption);
    }
  }

  useRender(renderer: any): void {
    if (this.markInstance.use) {
      this.markInstance.use({ renderer: { ...this.defaultRender, ...renderer } });
    } else if (this.markInstance.marked && this.markInstance.use) {
      this.markInstance.marked.use({ renderer: { ...this.defaultRender, ...renderer } });
    }
  }

  useToken(tokenizer: any): void {
    if (this.markInstance.use) {
      this.markInstance.use({ tokenizer: { ...this.defaultTokenizer, ...tokenizer } });
    } else if (this.markInstance.marked && this.markInstance.use) {
      this.markInstance.marked.use({ tokenizer: { ...this.defaultTokenizer, ...tokenizer } });
    }
  }
}
