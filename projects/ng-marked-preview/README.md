# Ng-Marked-Preview

markdown编辑与展示

## 安装

```bash
npm i ng-marked-preview 
```

<br/>

```bash
yarn add ng-marked-p
```
## 如何使用

### Typescript

```typescript
import { NgMarkedPreviewModule } from 'ng-marked-preview';
@NgModule({
  declarations: [
    // ...something
  ],
  imports: [
    // ...otherModules
    NgMarkedPreviewModule
  ]
})
export class **Module { }
```

## 基本用法

### html

```html
<lib-ng-marked-preview [context]="previewText"></lib-ng-marked-preview>
```

> `vue` 版本 [传送门](https://imzbf.github.io/md-editor-v3/)


## API

### ng-editor-markdown

|参数|说明|类型|默认值|支持全局配置|
|-|-|-|-|-|
|option|编辑器配置项|`MarkdownOption`| ... | 是|
|context|内容传入markdown文本|`string`|| 否|

### MarkBaseService

|成员|说明|类型|默认值|支持全局配置|
|-|-|-|-|-|
|toHtml|将markdown转化为html|`function (content: string)`|-||
|useRender|扩展渲染函数，扩展方式参照[marked](https://marked.js.org/using_pro#renderer)|`function (render)`|-||
|useToken|扩展解析函数，扩展方式参照[marked](https://marked.js.org/using_pro#tokenizer)|`function (tokenizer)`|-||

#### 扩展例子

```typescript
constructor( private markBaseService: MarkBaseService) {
    const render = {
        code: (text: string, infostring: string) : string
    };
    this.markBaseService.useRender(render);
}
```