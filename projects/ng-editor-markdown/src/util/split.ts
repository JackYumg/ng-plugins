import { Injectable } from "@angular/core";
import { headersExp, newLineExp } from "../core/datas/rgeexp";
import { HeaderNode, VNode } from "./vnode";
@Injectable({
    providedIn: 'root'
})
export class WordSplit {
    private currentNodes: VNode[] = [];
    // 整个输入的数据进行转换
    parse(input: string | undefined) {
        if (input) {
            const tracks = input.split(newLineExp).filter(e => !!e);
            return tracks;
        } else {
            return [];
        }
    }

    createVnodes(tracks: string[]) {
        tracks.map((traskStr = '') => {
            if (headersExp.test(traskStr)) { // 标题匹配
                const rpxRes = traskStr.match(headersExp);
                if (rpxRes && rpxRes[0]) {
                    const level = rpxRes[0].trim().length;
                    const [context] = traskStr.split(headersExp).filter(e => !!e);
                    const header = this.createHeader(context, level);
                    if (header) {
                        this.currentNodes.push(header)
                    }
                }
            } else {

            }
        });
        return this.currentNodes;
    }

    createHeader(context: string = '', level: number) {
        var node = null;
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
            node.context = context;
        }
        return node
    }

}