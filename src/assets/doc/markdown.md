# Markdown编辑器

markdown编辑与展示

## 如何使用

> `import` { NgEditorMarkdownModule } from `'ng-editor-markdown'`;

## 基本用法

### html

```html
<ng-editor-markdown [(ngModel)]="bindValue" name="bindValueName"></ng-editor-markdown>
```

### 使用 formControl

```html
<ng-editor-markdown formControlName="bindValue" name="bindValueName"></ng-editor-markdown>
```

> `vue` 版本 [传送门](https://imzbf.github.io/md-editor-v3/)


## API

### ng-editor-markdown

|参数|说明|类型|默认值|支持全局配置|
|-|-|-|-|-|
|option|编辑器配置项|MarkdownOption| ... | 是|
|1212|可以双向绑定|string|1212| 否|