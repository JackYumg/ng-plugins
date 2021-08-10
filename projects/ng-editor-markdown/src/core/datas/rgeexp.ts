export const boldExp = /^\*{2}[\w\u4e00-\u9fa5]+\*{2}$/; // 匹配加粗
export const italtcExp = /^\*{1}[\w\u4e00-\u9fa5]+\*{1}$/;// 匹配斜体
export const charExp = /[\w\u4e00-\u9fa5]+/;
export const newLineExp = /\r\n|\n|\r/; // 换行符，或其他控制表符
export const headersExp = /^#+\s/;