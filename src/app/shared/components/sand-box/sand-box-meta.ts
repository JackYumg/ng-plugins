export interface FileItem {
    name: string;
    content: string;
    lang: 'html' | 'js' | 'typescript' | 'css' | 'less' | 'scss' | 'md';
}
