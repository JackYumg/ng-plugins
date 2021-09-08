import { Injectable, Renderer2 } from '@angular/core';
import { LinkNode, VNode, HeaderNode, ItaltcNode, BoldNode, TableNode, TrNode, TdNode, ImageNode, RefrenceNode } from './vnode';

type ReturnType = HTMLElement | Text | HTMLTableElement;

@Injectable()
export class TokenTree {
    constructor(
        private renderer2: Renderer2
    ) {

    }
    // 创建dom树
    // build a dom tree
    createDomTree(treeNodes: VNode[]): ReturnType[] {
        const nodes: ReturnType[] = [];
        treeNodes.map((treeNode: VNode) => {
            let rootNode: HTMLElement | Text | undefined;
            if (!treeNode.isRoot) {
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
        const e = document.createTextNode(commitNode.context || '');
        return e;
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
        refrenceNode.context && (a.innerText = refrenceNode.context);
        return a;
    }
}
