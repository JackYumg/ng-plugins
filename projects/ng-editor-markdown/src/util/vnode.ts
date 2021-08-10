type VNodeType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'list' | 'code' | 'table' | 'imgage' | '';
export class VNode {
    type: VNodeType = '';
    vid: number | undefined;
    context: string | undefined;
    child: VNode[] = [];
    constructor(type: VNodeType) {
        this.type = type;
    }
}
export class ImageNode extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
    desc: string | '内容描述' = '';
    url: string | undefined;
}

export class LinkNode extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
    href: string | undefined;
    desc: string | undefined;
}

export class HeaderNode extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
}

export class BoldNode extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
}

export class ItaltcNode extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
}

export class Blockquote extends VNode {
    constructor(type: VNodeType) {
        super(type)
    }
}