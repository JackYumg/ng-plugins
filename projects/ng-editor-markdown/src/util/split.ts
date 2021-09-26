import { Injectable } from '@angular/core';
import { boldExp, codeExp, headersExp, imageExp, italtcExp, netAddressExp, newLineExp, refrenceExp, tableExp, codeWordExp, tagExp, codeEndExp, ulistExp, olistExp } from '../core/datas/rgeexp';
import { BoldNode, CommitNode, HeaderNode, ItaltcNode, LinkNode, TableNode, TdNode, TrNode, VNode, ImageNode, RefrenceNode, CodeNode, CodeWordNode, BrNode, TagNode, UListNode, OListNode, LiNode } from './vnode';
@Injectable({
    providedIn: 'root'
})
export class WordSplit {
    // 整个输入的数据进行转换
    parse(input: string | undefined): string[] {
        if (input) {
            const tracks = input.split(newLineExp).filter(e => !!e);
            return tracks;
        } else {
            return [];
        }
    }

    createVnodes(tracks: string[], isNewLine = true): VNode[] {
        const currentNodes: VNode[] = [];
        // 记录需要合并的字符串。比如遇到代码时
        let recordStrs: any[] = [];
        let lg = '';
        tracks.map((traskStr = '') => {
            if (isNewLine && !(ulistExp.test(traskStr) || olistExp.test(traskStr))) {
                traskStr = traskStr.trim();
            }
            if (headersExp.test(traskStr) && isNewLine && recordStrs.length <= 0) { // 标题匹配
                const rpxRes = traskStr.match(headersExp);
                if (rpxRes && rpxRes[0]) {
                    const level = rpxRes[0].trim().length;
                    const [context] = traskStr.split(headersExp).filter(e => !!e);
                    const header = this.createHeader(context, level);
                    if (header) {
                        header.isNewLine = isNewLine;
                        currentNodes.push(header);
                    }
                }
            } else if (ulistExp.test(traskStr) && isNewLine && recordStrs.length <= 0) { // 列表匹配
                const rpxRes = traskStr.match(ulistExp);
                if (rpxRes && rpxRes[0]) {
                    const level = rpxRes[0].length;
                    const context = traskStr.split('\n').filter(e => !!e);
                    const header = this.createUList(context.map(str => str.split(ulistExp).join('')), level);
                    if (header) {
                        header.isNewLine = isNewLine;
                        currentNodes.push(header);
                    }
                }
            } else if (olistExp.test(traskStr) && isNewLine && recordStrs.length <= 0) { // 列表匹配
                const rpxRes = traskStr.match(olistExp);
                if (rpxRes && rpxRes[0]) {
                    const level = rpxRes[0].length;
                    const context = traskStr.split('\n').filter(e => !!e);
                    const header = this.createOList(context.map(str => str.split(olistExp).join('')), level);
                    if (header) {
                        header.isNewLine = isNewLine;
                        currentNodes.push(header);
                    }
                }
            }
            else if (tableExp.test(traskStr) && /^\|/.test(traskStr) && recordStrs.length <= 0) { // 表格匹配
                const matheToekns: string[] = traskStr.split(tableExp) || [];
                const e = this.createTable(matheToekns);
                e.isNewLine = isNewLine;
                currentNodes.push(e);
            } else if (codeExp.test(traskStr) || recordStrs.length > 0 || codeEndExp.test(traskStr)) { // 代码块
                if (codeExp.test(traskStr) && codeEndExp.test(traskStr)) {
                    const [m1] = traskStr.match(codeExp) || '';
                    if (m1) {
                        const [d1, d2] = m1.split((/```/));
                        if (d2) {
                            lg = d2;
                        }
                    }
                    const datas = traskStr.split(codeExp).join('\n').split(codeEndExp);
                    recordStrs = recordStrs.concat(datas);
                    const node = this.createCode(recordStrs, lg);
                    recordStrs = [];
                    currentNodes.push(node);
                } else if (codeExp.test(traskStr)) {
                    const [m1] = traskStr.match(codeExp) || '';
                    if (m1) {
                        const [d1, d2] = m1.split(/```/);
                        if (d2) {
                            lg = d2;
                        }
                    }
                    const datas = traskStr.split(codeExp);
                    recordStrs = recordStrs.concat(datas);
                }
                else if (codeEndExp.test(traskStr)) {
                    const datas = traskStr.split(codeEndExp);
                    recordStrs = recordStrs.concat(datas);
                    const node = this.createCode(recordStrs, lg);
                    recordStrs = [];
                    currentNodes.push(node);
                } else {
                    recordStrs.push(traskStr);
                }
            }
            else if (new RegExp(tagExp).test(traskStr)) {
                const e = this.createTagNode(traskStr);
                e.isNewLine = isNewLine;
                currentNodes.push(e);
            } else if (refrenceExp.test(traskStr) && recordStrs.length <= 0) { // 引用
                const matheToekns: string[] = traskStr.split(refrenceExp) || [];
                const e = this.createRefrence(matheToekns);
                e.isNewLine = isNewLine;
                currentNodes.push(e);
            }
            else if (boldExp.test(traskStr) && recordStrs.length <= 0) { // 加粗匹配
                const rpxRes = traskStr.match(boldExp);
                if (rpxRes && rpxRes[0]) {
                    const boldtxt = this.createBold(traskStr);
                    if (boldtxt) {
                        boldtxt.isNewLine = isNewLine;
                        currentNodes.push(boldtxt);
                    }
                }
            } else if (italtcExp.test(traskStr) && recordStrs.length <= 0) { // 斜体匹配
                const rpxRes = traskStr.match(italtcExp);
                if (rpxRes && rpxRes[0]) {
                    const boldtxt = this.createItaltc(traskStr);
                    if (boldtxt) {
                        boldtxt.isNewLine = isNewLine;
                        currentNodes.push(boldtxt);
                    }
                }
            } else if (codeWordExp.test(traskStr) && recordStrs.length <= 0) { // 斜体匹配
                const rpxRes = traskStr.match(codeWordExp);
                if (rpxRes && rpxRes[0]) {
                    const boldtxt = this.createCodeWord(traskStr);
                    if (boldtxt) {
                        boldtxt.isNewLine = isNewLine;
                        currentNodes.push(boldtxt);
                    }
                }
            }
            else if (imageExp.test(traskStr) && recordStrs.length <= 0) {
                const node = this.createImageNodes(traskStr);
                node.isNewLine = isNewLine;
                currentNodes.push(node);
            } else if (netAddressExp.test(traskStr) && recordStrs.length <= 0) {
                const node = this.createNetAdress(traskStr);
                node.isNewLine = isNewLine;
                currentNodes.push(node);
            } else if (!traskStr.trim()) {
                // const node = this.createNextLine();
                // node.isNewLine = true;
                // currentNodes.push(node);
            }
            else {
                const baseNode = new CommitNode(traskStr);
                baseNode.isNewLine = isNewLine;
                currentNodes.push(baseNode);
            }
        });
        return currentNodes;
    }

    // 创建换行
    createNextLine() {
        const brNode = new BrNode();
        return brNode;
    }

    // 创建元素
    createTagNode(strs: string) {
        const tagNode = new TagNode();
        const e = strs.split(new RegExp(tagExp, 'g')).filter(e => !!e);
        // tagNode.context = e;
        const matched = strs.match(/[\w]+/g);
        tagNode.type = (matched || [])[0] as '';
        return tagNode;
    }

    // 创建网址
    createNetAdress(strs: string = ''): VNode {
        const baseNode = new VNode();
        let matched: string[] = strs.match(netAddressExp) || [];
        matched = matched.sort((a, b) => a.length - b.length);
        const keyMap: any = {

        };

        matched.map((e, index) => {
            keyMap['wym_' + index + '_wym'] = e;
        });

        matched.map((e, index) => {
            strs = strs.replace(e, 'wym_' + index + '_wym');
        });

        const str: string[] = [];
        matched.map((e, index) => {
            str.push('wym_' + index + '_wym');
        });
        const rxp = new RegExp(str.join('|'));
        const rxpg = new RegExp(str.join('|'), 'g');

        const a1: string[] = strs.split(rxp);
        const a2: string[] = strs.match(rxpg) as string[];
        const resList: string[] = [];
        let i = 0;
        let j = 0;
        while (i <= (a1.length - 1) || j <= (a2.length - 1)) {
            if (a1[i] || a1[i] === '') {
                resList.push(a1[i]);
                i++;
            }
            if (a2[j] || a2[j] === '') {
                resList.push(a2[j]);
                j++;
            }
        }
        resList.forEach((e, index) => {
            if (keyMap[e]) {
                resList[index] = keyMap[e].split(netAddressExp).filter((d: string) => !!d);
                const tempNode = new LinkNode('a');
                tempNode.context = resList[index][0];
                tempNode.href = resList[index][1];
                baseNode.child = baseNode.child.concat(tempNode);
            } else {
                const tempNode = this.createVnodes([e], false);
                baseNode.child = baseNode.child.concat(tempNode);
            }
        });
        return baseNode;
    }

    // 创建图片
    createImageNodes(strs: string = ''): VNode {
        const baseNode = new VNode();
        let matched: string[] = strs.match(imageExp) || [];
        matched = matched.sort((a, b) => a.length - b.length);
        const keyMap: any = {

        };

        matched.map((e, index) => {
            keyMap['wym_' + index + '_wym'] = e;
        });

        matched.map((e, index) => {
            strs = strs.replace(e, 'wym_' + index + '_wym');
        });

        const str: string[] = [];
        matched.map((e, index) => {
            str.push('wym_' + index + '_wym');
        });
        const rxp = new RegExp(str.join('|'));
        const rxpg = new RegExp(str.join('|'), 'g');

        const a1: string[] = strs.split(rxp);
        const a2: string[] = strs.match(rxpg) as string[];
        const resList: string[] = [];
        let i = 0;
        let j = 0;
        while (i <= (a1.length - 1) || j <= (a2.length - 1)) {
            if (a1[i] || a1[i] === '') {
                resList.push(a1[i]);
                i++;
            }
            if (a2[j] || a2[j] === '') {
                resList.push(a2[j]);
                j++;
            }
        }
        resList.forEach((e, index) => {
            if (keyMap[e]) {
                resList[index] = keyMap[e].split(imageExp).filter((d: string) => !!d);
                const tempNode = new ImageNode('imgage');
                tempNode.context = resList[index][0];
                tempNode.url = resList[index][1];
                baseNode.child = baseNode.child.concat(tempNode);
            } else {
                const tempNode = this.createVnodes([e], false);
                baseNode.child = baseNode.child.concat(tempNode);
            }
        });
        return baseNode;
    }

    // 创建表格
    createTable(matheToekns: string[]): VNode {
        matheToekns = matheToekns.filter( e => !!e);
        let resList: string[] = [];
        matheToekns.forEach((e) => {
            resList = resList.concat(e.split('\n|\r'));
        });
        const tableNodes: TrNode[] = [];
        const tableNode = new TableNode('table');
        for (const temp of resList) {
            const tempStr = temp.trim();
            if (tempStr) {
                const tempTr = this.createTableTr(tempStr);
                tableNodes.push(tempTr);
            } else {
                tableNodes.forEach((node) => {
                    node.child.forEach((child) => {
                        child.type = 'th';
                    });
                });
            }
        }
        tableNode.child = tableNodes;
        return tableNode;
    }

    createRefrence(matheToekns: string[]): VNode {
        matheToekns = matheToekns.filter(e => !!e);
        const refrenceNode = new RefrenceNode('blockquote');
        const e = this.createVnodes(matheToekns, false);
        if (e.length > 0 && e[0].isRoot) {
            refrenceNode.child = e;
        } else {
            refrenceNode.context = matheToekns.join('');
        }
        return refrenceNode;
    }

    createCode(matheToekns: string[], lg: string) {
        const codeNode = new CodeNode('pre');
        codeNode.lg = lg;
        codeNode.context = matheToekns.join('\n');
        return codeNode;
    }

    // // 创建tr
    createTableTr(trStr: string): TrNode {
        const rootNode = new TrNode('tr');
        const datas = trStr.split(/\|/).filter(e => !!e.trim());
        for (const data of datas) {
            const node = new TdNode('td');
            node.context = data;
            const e = this.createVnodes([node.context], false);
            node.child = e;
            rootNode.child.push(node);
        }
        return rootNode;
    }

    createBold(strs: string = ''): VNode {
        const baseNode = new VNode();
        let matched: string[] = strs.match(boldExp) || [];
        matched = matched.sort((a, b) => a.length - b.length);
        const keyMap: any = {

        };

        matched.map((e, index) => {
            keyMap['wym_' + index + '_wym'] = e;
        });

        matched.map((e, index) => {
            strs = strs.replace(e, 'wym_' + index + '_wym');
        });

        const str: string[] = [];
        matched.map((e, index) => {
            str.push('wym_' + index + '_wym');
        });
        const rxp = new RegExp(str.join('|'));
        const rxpg = new RegExp(str.join('|'), 'g');

        const a1: string[] = strs.split(rxp);
        const a2: string[] = strs.match(rxpg) as string[];
        const resList: string[] = [];
        let i = 0;
        let j = 0;
        while (i <= (a1.length - 1) || j <= (a2.length - 1)) {
            if (a1[i] || a1[i] === '') {
                resList.push(a1[i]);
                i++;
            }
            if (a2[j] || a2[j] === '') {
                resList.push(a2[j]);
                j++;
            }
        }
        let isFull = true;
        resList.forEach((e, index) => {
            if (keyMap[e]) {
                const context = keyMap[e].split(/\*{2}|\*{2}$/).join('');
                const sizer = this.createVnodes([context], false);
                if (sizer.length > 0 && sizer[0].isRoot) {
                    baseNode.child = baseNode.child.concat(sizer);
                } else {
                    const tempBoldNode = new BoldNode('b');
                    tempBoldNode.context = context;
                    baseNode.child.push(tempBoldNode);
                }
            } else {
                isFull = false;
                const tempNode = this.createVnodes([e], false);
                baseNode.child = baseNode.child.concat(tempNode);
            }
        });
        if (isFull) {
            baseNode.type = 'b';
        }
        return baseNode;
    }
    createItaltc(strs: string = ''): VNode {
        const baseNode = new VNode();
        let matched: string[] = strs.match(italtcExp) || [];
        matched = matched.sort((a, b) => a.length - b.length);
        const keyMap: any = {

        };

        matched.map((e, index) => {
            keyMap['wym_' + index + '_wym'] = e;
        });

        matched.map((e, index) => {
            strs = strs.replace(e, 'wym_' + index + '_wym');
        });

        const str: string[] = [];
        matched.map((e, index) => {
            str.push('wym_' + index + '_wym');
        });
        const rxp = new RegExp(str.join('|'));
        const rxpg = new RegExp(str.join('|'), 'g');

        const a1: string[] = strs.split(rxp);
        const a2: string[] = strs.match(rxpg) as string[];
        const resList: string[] = [];
        let i = 0;
        let j = 0;
        while (i <= (a1.length - 1) || j <= (a2.length - 1)) {
            if (a1[i] || a1[i] === '') {
                resList.push(a1[i]);
                i++;
            }
            if (a2[j] || a2[j] === '') {
                resList.push(a2[j]);
                j++;
            }
        }
        let isFull = true;
        resList.forEach((e, index) => {
            if (keyMap[e]) {
                const context = keyMap[e].split(/\*{1}|\*{1}$/).join('');
                const sizer = this.createVnodes([context], false);
                if (sizer.length > 0 && sizer[0].isRoot) {
                    baseNode.child = baseNode.child.concat(sizer);
                } else {
                    const tempBoldNode = new ItaltcNode('i');
                    tempBoldNode.context = context;
                    baseNode.child.push(tempBoldNode);
                }
            } else {
                isFull = false;
                const tempNode = this.createVnodes([e], false);
                baseNode.child = baseNode.child.concat(tempNode);
            }
        });
        if (isFull) {
            baseNode.type = 'i';
        }
        return baseNode;
    }

    createCodeWord(strs: string = ''): VNode {
        const baseNode = new VNode();
        let matched: string[] = strs.match(codeWordExp) || [];
        matched = matched.sort((a, b) => a.length - b.length);
        const keyMap: any = {

        };

        matched.map((e, index) => {
            keyMap['wym_' + index + '_wym'] = e;
        });

        matched.map((e, index) => {
            strs = strs.replace(e, 'wym_' + index + '_wym');
        });

        const str: string[] = [];
        matched.map((e, index) => {
            str.push('wym_' + index + '_wym');
        });
        const rxp = new RegExp(str.join('|'));
        const rxpg = new RegExp(str.join('|'), 'g');

        const a1: string[] = strs.split(rxp);
        const a2: string[] = strs.match(rxpg) as string[];
        const resList: string[] = [];
        let i = 0;
        let j = 0;
        while (i <= (a1.length - 1) || j <= (a2.length - 1)) {
            if (a1[i] || a1[i] === '') {
                resList.push(a1[i]);
                i++;
            }
            if (a2[j] || a2[j] === '') {
                resList.push(a2[j]);
                j++;
            }
        }
        let isFull = true;
        resList.forEach((e, index) => {
            if (keyMap[e]) {
                const context = keyMap[e].split(/`{1}|\`{1}$/).join('');
                const sizer = this.createVnodes([context], false);
                if (sizer.length > 0 && sizer[0].isRoot) {
                    baseNode.child = baseNode.child.concat(sizer);
                } else {
                    const tempBoldNode = new CodeWordNode('code');
                    tempBoldNode.context = context;
                    baseNode.child.push(tempBoldNode);
                }
            } else {
                isFull = false;
                const tempNode = this.createVnodes([e], false);
                baseNode.child = baseNode.child.concat(tempNode);
            }
        });
        if (isFull) {
            baseNode.type = 'i';
        }
        return baseNode;
    }

    createHeader(context: string = '', level: number): VNode {
        let node: VNode = new HeaderNode();
        switch (level) {
            case 1:
                node = new HeaderNode('h1');
                break;
            case 2:
                node = new HeaderNode('h2');
                break;
            case 3:
                node = new HeaderNode('h3');
                break;
            case 4:
                node = new HeaderNode('h4');
                break;
            case 5:
                node = new HeaderNode('h5');
                break;
            case 6:
                node = new HeaderNode('h6');
                break;
        }
        if (node) {
            const children = this.createVnodes([context]);
            if (children.length > 0) {
                node.child = children;
            } else {
                node.context = context;
            }
        }
        return node;
    }

    createUList(context: string[] = [], level: number): VNode {
        const node: UListNode = new UListNode('ul');
        if (context.length > 0) {
            context.forEach((contextstr) => {
                const child = this.createLi(contextstr);
                node.child.push(child);
            });
        }
        return node;
    }

    createOList(context: string[] = [], level: number): VNode {
        const node: OListNode = new OListNode('ol');
        if (context.length > 0) {
            context.forEach((contextstr) => {
                const child = this.createLi(contextstr);
                node.child.push(child);
            });
        }
        return node;
    }

    createLi(context: string): VNode {
        const node: LiNode = new LiNode('li');
        const children = this.createVnodes([context], false);
        node.child = children;
        return node;
    }

}
