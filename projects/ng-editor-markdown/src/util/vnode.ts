type VNodeType = 'li' | 'ul' | 'ol' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'list' | 'code' | 'table' | 'imgage' | 'div' | 'tr' | 'td' | 'th' | 'commit' | 'root' | 'i' | 'b' | 'pre' | 'blockquote' | 'br' | 'sub' | 'sup' | '';
// 基础节点
export class VNode {
    type: VNodeType = '';
    vid: number | undefined;
    context: string | undefined;
    child: VNode[] = [];
    isNewLine = false;
    constructor(type: VNodeType = 'root') {
        this.type = type;
    }
    hasChild(): boolean {
        return this.child.length > 0;
    }

    get isRoot(): boolean {
        return this.type === 'root';
    }
}

export class BrNode extends VNode {
    constructor() {
        super('br');
    }
}

export class TagNode extends VNode {
    constructor() {
        super('');
    }
}

// 空文本节点
export class CommitNode extends VNode {
    constructor(value: string) {
        super('commit');
        this.context = value;
    }
}

export class ImageNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
    desc: string | '内容描述' = '';
    url: string | undefined;
}

export class LinkNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
    href: string | undefined;
    desc: string | undefined;
}

export class HeaderNode extends VNode {
    constructor(type?: VNodeType) {
        super(type);
    }
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
}
export class UListNode extends VNode {
    dataContext: string[] = [];
    constructor(type?: VNodeType) {
        super(type);
    }
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
}
export class OListNode extends VNode {
    dataContext: string[] = [];
    constructor(type?: VNodeType) {
        super(type);
    }
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
}

export class LiNode extends VNode {
    constructor(type: VNodeType = 'b') {
        super(type);
    }
}
export class BoldNode extends VNode {
    constructor(type: VNodeType = 'b') {
        super(type);
    }
}

export class ItaltcNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
}
export class CodeWordNode extends VNode {
    lg = 'js';
    constructor(type: VNodeType) {
        super(type);
    }
}

export class Blockquote extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
}

export class TableNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
    trs: VNode[] = [];
}

export class RefrenceNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
}

export class TrNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }

    tds: TdNode[] = [];
}

export class TdNode extends VNode {
    constructor(type: VNodeType) {
        super(type);
    }
}

export class CodeNode extends VNode {
    lg = 'js';
    constructor(type: VNodeType = 'code') {
        super(type);
    }
}
