var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, observe, property } from '@polymer/decorators';
import '@polymer/paper-toast/paper-toast';
import { html, PolymerElement } from '@polymer/polymer';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '../supported-classes/supported-class-view';
import style from './viewer.pcss';
import template from './viewer.html';
let ApiDocumentationViewer = class ApiDocumentationViewer extends PolymerElement {
    constructor() {
        super(...arguments);
        this.modelTypes = [];
    }
    get classFound() {
        return !!this.selectedClass;
    }
    selectClassById(classId) {
        if (!this.apiDocs || !this.apiDocs.classes) {
            return;
        }
        const clazz = this.apiDocs.classes.find((c) => {
            return c.id === classId;
        });
        this.selectClass(clazz);
    }
    selectCurrentClass(apiDocs, types) {
        if (!apiDocs || !apiDocs.classes) {
            return;
        }
        const clazz = apiDocs.classes.find((c) => {
            return types.some((t) => c.id === t);
        });
        this.selectClass(clazz);
    }
    isCurrent(typeId) {
        return this.modelTypes.some((t) => {
            return t === typeId;
        });
    }
    onClassSelected(e) {
        this.selectClass(e.detail.classId);
        e.preventDefault();
    }
    closeToast() {
        this.$.toast.close();
    }
    selectClass(clas) {
        if (typeof clas === 'string') {
            this.selectClassById(clas);
        }
        this.selectedClass = clas;
        if (!clas) {
            this.$.toast.open();
            this.$.classSelect.value = null;
        }
        else {
            this.$.toast.close();
            this.$.classSelect.value = clas.id;
        }
    }
    static get template() {
        return html([`<style>${style}</style> ${template}`]);
    }
};
__decorate([
    computed('selectedClass')
], ApiDocumentationViewer.prototype, "classFound", null);
__decorate([
    property({ type: Object })
], ApiDocumentationViewer.prototype, "apiDocs", void 0);
__decorate([
    property({ type: Array })
], ApiDocumentationViewer.prototype, "modelTypes", void 0);
__decorate([
    property({ type: Object })
], ApiDocumentationViewer.prototype, "selectedClass", void 0);
__decorate([
    observe('apiDocs', 'modelTypes')
], ApiDocumentationViewer.prototype, "selectCurrentClass", null);
ApiDocumentationViewer = __decorate([
    customElement('api-documentation-viewer')
], ApiDocumentationViewer);
