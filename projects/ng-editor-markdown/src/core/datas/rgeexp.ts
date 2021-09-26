export const boldExp = /\*{2}[\s\w]+\*{2}/; // 匹配加粗
export const italtcExp = /\*{1}[\s|\S]+\*{1}/; // 匹配斜体
export const codeWordExp = /`{1}[\s|\S]+`{1}/;
export const charExp = /[\w\u4e00-\u9fa5]+/;
export const newLineExp = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g; // 换行符，或其他控制表符
export const headersExp = /^#+\s/g;
export const ulistExp = /^\-\s+/; // 无序
export const olistExp = /[0-9]+\.\s/; // 有序
export const tableExp = /\|[\s\t]{0,}[\-]{1,}/g;
export const imageExp = /!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/g; //  图片匹配
export const netAddressExp = /\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/g; // 地址匹配
export const refrenceExp = /^>/; // 引用
export const codeExp = /^`{3}[\w]{0,}/;
export const codeEndExp = /`{3}$/;
export const tagExp = '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'; // CDATA section
