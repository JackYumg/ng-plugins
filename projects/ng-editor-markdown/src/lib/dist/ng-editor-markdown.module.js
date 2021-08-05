"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NgEditorMarkdownModule = void 0;
var core_1 = require("@angular/core");
var ng_editor_markdown_component_1 = require("./ng-editor-markdown.component");
var NgEditorMarkdownModule = /** @class */ (function () {
    function NgEditorMarkdownModule() {
    }
    NgEditorMarkdownModule = __decorate([
        core_1.NgModule({
            declarations: [
                ng_editor_markdown_component_1.NgEditorMarkdownComponent
            ],
            imports: [],
            exports: [
                ng_editor_markdown_component_1.NgEditorMarkdownComponent
            ]
        })
    ], NgEditorMarkdownModule);
    return NgEditorMarkdownModule;
}());
exports.NgEditorMarkdownModule = NgEditorMarkdownModule;
