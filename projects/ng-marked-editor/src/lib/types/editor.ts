// 保存的配置项
export interface SaveOption {
    autoSave?: boolean;
}

// 工具条有哪些功能
export const defualtToolbars: EditorToolType[] =
    ['blod', 'underline', 'italic', 'del', 'header', 'sub', 'sup',
        'blockquote', 'ul', 'ol', 'inner-code', 'block-code', 'link', 'imgage',
        'table', 'liuchengtu', 'gongshi', 'revoke', 'next', 'baocun', 'prettier',
        'fangda', 'fullScreen', 'preview', 'coding', 'github'];
type EditorToolType = 'blod' | 'underline' | 'italic' | 'del' | 'header' | 'sub' | 'sup' | 'blockquote' | 'ul' | 'ol' | 'inner-code' | 'block-code' | 'link' | 'imgage' | 'table' | 'liuchengtu' | 'gongshi' | 'revoke' | 'next' | 'baocun' | 'prettier' | 'fangda' | 'fullScreen' | 'preview' | 'coding' | 'github';
// 给编辑框定义的类型
export interface NgMarkedEditorOption {
    saveOption: SaveOption;
    toolbars?: EditorToolType[];
    customUpload?: boolean; // 是否自定义上传，默认true，false时，文件上传到默认地址
}

// 工具栏图标信息
export interface ToolItem {
    name: string;
}

// 当前选中信息
export interface MdSelection {
    index: number;
    text: string;
    rowNum: number;
}

// 操作完成后返回的内容
export interface ResTrans {
    value: string;
    selectStart: number;
    selectEnd: number;
}

