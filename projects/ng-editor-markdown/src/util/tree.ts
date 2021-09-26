import { Injectable, Renderer2 } from '@angular/core';
import { LinkNode, VNode, HeaderNode, ItaltcNode, BoldNode, TableNode, TrNode, TdNode, ImageNode, RefrenceNode, CodeWordNode, TagNode, UListNode, OListNode, LiNode } from './vnode';
import * as hljs from 'highlightjs';
import { fromEvent } from 'rxjs';
import { NgEditorMarkdownService } from './../lib/ng-editor-markdown.service';
type ReturnType = HTMLElement | Text | HTMLTableElement;

@Injectable()
export class TokenTree {
    constructor(
        private renderer2: Renderer2,
        private ngEditorMarkdownService: NgEditorMarkdownService
    ) {
    }
    // 创建dom树
    // build a dom tree
    createDomTree(treeNodes: VNode[]): ReturnType[] {
        const nodes: ReturnType[] = [];
        treeNodes.map((treeNode: VNode) => {
            let rootNode: HTMLElement | Text | undefined;
            if (treeNode && !treeNode.isRoot) {
                switch (treeNode.type) {
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                        rootNode = this.createHeader(treeNode as HeaderNode);
                        break;
                    case 'a':
                        rootNode = this.createLink(treeNode as LinkNode);
                        break;
                    case 'commit':
                        rootNode = this.createCommit(treeNode as VNode);
                        break;
                    case 'i':
                        rootNode = this.createItaltc(treeNode as ItaltcNode);
                        break;
                    case 'b':
                        rootNode = this.createItaltc(treeNode as BoldNode);
                        break;
                    case 'table':
                        rootNode = this.createTable(treeNode as TableNode);
                        break;
                    case 'th':
                    case 'tr':
                        rootNode = this.createTableRow(treeNode as TrNode);
                        break;
                    case 'td':
                        rootNode = this.createTableCol(treeNode as TdNode);
                        break;
                    case 'imgage':
                        rootNode = this.createImage(treeNode as ImageNode);
                        break;
                    case 'blockquote':
                        rootNode = this.createRefrence(treeNode as RefrenceNode);
                        break;
                    case 'pre':
                        rootNode = this.createCodePre(treeNode as any);
                        break;
                    case 'code':
                        rootNode = this.createCodeWord(treeNode as CodeWordNode);
                        break;
                    case 'br':
                        rootNode = this.createBr();
                        break;
                    case 'sub' || 'sup':
                        rootNode = this.createTag(treeNode as TagNode);
                        break;
                    case 'ul':
                    case 'ol':
                        rootNode = this.createList(treeNode as UListNode | OListNode);
                        break;
                    case 'li':
                        rootNode = this.createLi(treeNode as LiNode);
                        break;
                }
            }
            if (!rootNode) {
                rootNode = treeNode.isNewLine ? this.renderer2.createElement('p') : document.createDocumentFragment();
            }
            if (treeNode.child.length > 0) {
                const temp: string[] = this.createDomTree(treeNode.child) as any[];
                temp.forEach((item: any) => {
                    rootNode?.appendChild(item);
                });
            }
            if (rootNode) {
                nodes.push(rootNode);
            }
        });
        return nodes;
    }
    createCommit(commitNode: VNode): Text {
        if (commitNode.isNewLine) {
            const e = this.renderer2.createElement('p');
            const c = document.createTextNode(`${commitNode.context || ''}`);
            e.appendChild(c);
            return e;
        } else {
            const e = document.createTextNode(`${commitNode.context || ''}`);
            return e;
        }
    }
    createHeader(headerNode: VNode & HeaderNode): HTMLElement {
        const e: HTMLHeadElement = this.renderer2.createElement(headerNode.type);
        e.innerText = headerNode.context || '';
        return e;
    }

    createItaltc(italtcNode: VNode & ItaltcNode): HTMLElement {
        const e: HTMLElement = this.renderer2.createElement(italtcNode.type);
        e.innerText = italtcNode.context || '';
        return e;
    }

    createLink(linkNode: VNode & LinkNode): HTMLElement {
        const a: HTMLLinkElement = this.renderer2.createElement(linkNode.type);
        a.innerText = linkNode.context || '';
        a.title = linkNode.context || '';
        a.href = linkNode.href || '';
        a.target = '__target';
        return a;
    }

    createImage(imageNode: VNode & ImageNode): HTMLElement {
        const a: HTMLImageElement = this.renderer2.createElement('img');
        a.title = imageNode.desc || '';
        a.src = imageNode.url || '';
        a.alt = '图片加载失败...';
        return a;
    }
    createTable(tableNode: VNode & TableNode): HTMLTableElement {
        const a: HTMLTableElement = this.renderer2.createElement(tableNode.type);
        a.classList.add('table');
        return a;
    }

    createTableRow(rowNode: TrNode): HTMLTableRowElement {
        const a: HTMLTableRowElement = this.renderer2.createElement(rowNode.type);
        return a;
    }

    createTableCol(colNode: TdNode): HTMLTableColElement {
        const a: HTMLTableColElement = this.renderer2.createElement(colNode.type);
        return a;
    }

    createRefrence(refrenceNode: RefrenceNode): any {
        const a: any = this.renderer2.createElement(refrenceNode.type);
        if (refrenceNode.context) {
            a.innerText = refrenceNode.context;
        }
        return a;
    }

    createCodeWord(codewordNode: CodeWordNode): HTMLElement {
        const a: any = this.renderer2.createElement('code');
        if (codewordNode.context) {
            a.innerText = codewordNode.context;
        }
        return a;
    }

    createCodePre(codewordNode: CodeWordNode): HTMLElement {
        const a: any = this.renderer2.createElement('pre');
        if (codewordNode.context) {
            a.innerText = codewordNode.context;
        }
        const e: string = hljs.highlightAuto(codewordNode.context || '', [codewordNode.lg]).value;
        a.innerHTML = e;

        // 加入复制代码按钮
        const span: HTMLSpanElement = this.renderer2.createElement('span');
        span.innerText = '复制代码';
        span.title = '复制';
        span.classList.add('code-copy');
        a.appendChild(span);

        fromEvent(span, 'mouseup').subscribe(() => {
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', a.innerText.replace(/(复制成功)|(复制代码)$/, ''));
            input.select();
            if (document.execCommand) {
                document.execCommand('copy');
                span.innerText = '复制成功';
                let timers: any = 0;
                timers = setTimeout(() => {
                    span.innerText = `复制代码`;
                }, 3000);
                this.ngEditorMarkdownService.copyEvent.emit(true);
            }
            document.body.removeChild(input);
        });
        return a;
    }

    createBr(): HTMLElement {
        const a: any = this.renderer2.createElement('br');
        return a;
    }

    createTag(value: TagNode): HTMLElement {
        const a: any = this.renderer2.createElement(value.type);
        a.innerText = value.context;
        return a;
    }

    createLi(value: LiNode): HTMLElement {
        const a: any = this.renderer2.createElement(value.type);
        return a;
    }

    createList(value: UListNode | OListNode): HTMLElement {
        const a: any = this.renderer2.createElement(value.type);
        return a;
    }
}
