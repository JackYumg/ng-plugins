"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var ng_editor_markdown_service_1 = require("./ng-editor-markdown.service");
describe('NgEditorMarkdownService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(ng_editor_markdown_service_1.NgEditorMarkdownService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
