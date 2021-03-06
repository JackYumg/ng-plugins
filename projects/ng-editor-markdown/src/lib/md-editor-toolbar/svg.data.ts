export const H = `<path d="M596.173 466.534H427.827V263.578h-97.075v496.844h97.075V548.454h168.346v211.968h97.075V263.578h-97.075v202.956z" p-id="2027" fill="#495057"></path>`;
export const B = `<path d="M497.022373 1023.70431a358.982586 358.982586 0 0 0 242.736004-81.556205 268.343106 268.343106 0 0 0 94.794594-213.746831 240.126979 240.126979 0 0 0-62.423352-170.069812 259.356463 259.356463 0 0 0-166.784372-78.94718v-2.609025a256.747437 256.747437 0 0 0 131.707474-91.799047 243.992202 243.992202 0 0 0 48.315287-149.294238A207.659105 207.659105 0 0 0 704.778109 64.935746 335.018203 335.018203 0 0 0 489.485188 0.579783L201.332813 9.083274l-12.851866 1014.621036h308.541426z m-44.450065-907.65099q193.26115 0 193.26115 144.945863a160.793277 160.793277 0 0 1-54.499644 129.098448 224.086303 224.086303 0 0 1-150.260544 46.575937H320.768204V116.05332h131.804104z m4.541637 434.837587q238.580889 0 238.484259 175.674386a165.238283 165.238283 0 0 1-56.432256 133.060301 240.900023 240.900023 0 0 1-160.213493 48.315288H320.381682v-356.566822h136.732263z" p-id="2971"></path>`
export interface IconsTypes {
    element: string;
    name: string;
    value?: number;
    size: string;
    valueEn: string;
}

export const icons: IconsTypes[] = [
    { element: H, value: 0, name: '标题', valueEn: 'header', size: '32' },
    { element: B, value: 0, name: '加粗', valueEn: 'bold', size: '32' },
    { element: B, value: 0, name: '斜体', valueEn: 'italtc', size: '32' },
    { element: B, value: 0, name: '代码块', valueEn: 'code', size: '32' },
    { element: B, value: 0, name: '链接', valueEn: 'link', size: '32' },
    { element: B, value: 0, name: 'blockquote', valueEn: 'blockquote', size: '32' },
    { element: B, value: 0, name: '图片', valueEn: 'img', size: '32' },
    { element: B, value: 0, name: '无序列表', valueEn: 'ul', size: '32' },
    { element: B, value: 0, name: '有序列表', valueEn: 'ol', size: '32' },
    { element: B, value: 0, name: '表格', valueEn: 'table', size: '32' }
];

export const extraIcons: IconsTypes[] = [
    { element: H, value: 0, name: '全屏', valueEn: 'fullScr', size: '32' },
    { element: H, value: 1, name: '预览', valueEn: 'preview', size: '32' },
    { element: H, value: 1, name: '预览禁用', valueEn: 'preview-disable', size: '32' },
];

export const toolTypes = icons.map(icon => icon.valueEn);
const valueEns = icons.map(icon => icon.valueEn);
export type typeNameIcons = typeof valueEns;
