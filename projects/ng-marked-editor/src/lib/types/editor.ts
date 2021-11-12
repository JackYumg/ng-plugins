// 保存的配置项
export interface SaveOption {
    autoSave?: boolean;
}
// 给编辑框定义的类型
export interface NgMarkedEditorOption {
    saveOption: SaveOption;
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
export interface ResTrans{
    value: string;
    selectStart: number;
    selectEnd: number;
}

