var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, listen, property } from '@polymer/decorators';
import { DeclarativeEventListeners } from '@polymer/decorators/lib/declarative-event-listeners.js';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { Hydra } from 'alcaeus';
import css from './style.pcss';
import template from './template.html';
import '@polymer/app-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/av-icons';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-styles/default-theme';
import '@polymer/paper-styles/paper-styles';
import '@polymer/paper-styles/typography';
import { Helpers } from 'LdNavigation/ld-navigation';
import '../../helper-elements/loading-overlay';
let HfApp = class HfApp extends DeclarativeEventListeners(PolymerElement) {
    constructor() {
        super(...arguments);
        this.model = null;
        this.state = 'ready';
        this.isLoading = false;
    }
    get hasApiDocumentation() {
        return !!this.model && !!this.model.apiDocumentation;
    }
    get urlInput() {
        return this.$.resource;
    }
    get displayedModel() {
        return this.currentModel.collection || this.currentModel;
    }
    static get template() {
        return html([`<style>${css}</style> ${template}`]);
    }
    hasPreviousModel(modelHistory) {
        return modelHistory.base.length > 0;
    }
    connectedCallback() {
        super.connectedCallback();
        import('../../entrypoint-selector');
    }
    showDocs() {
        this.$.documentation.open();
    }
    load() {
        this._setIsLoading(true);
        Helpers.fireNavigation(this, this.$.resource.value);
    }
    showModel(ev) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }
    async showDocumentation(e) {
        await import('../../api-documentation/viewer/viewer');
        this.$.apiDocumentation.selectClass(e.detail.classId);
        this.showDocs();
        e.stopPropagation();
    }
    showResource(e) {
        this.currentModel = e.detail.resource;
    }
    async showResourceJson(e) {
        await import('../../resource-views/resource-json');
        this.$.source.resource = e.detail.resource;
        this.$.source.show();
    }
    hideOperationForm() {
        this.state = this.prevState || 'ready';
    }
    async loadResource(value) {
        await import('../../entrypoint-selector');
        try {
            const hr = await Hydra.loadResource(value);
            const res = hr.root;
            this.model = res;
            this.currentModel = res;
            this.state = 'loaded';
            this._setIsLoading(false);
            this._loadOutlineElement();
        }
        catch (err) {
            this._setLastError(err);
            this.state = 'error';
            this._setIsLoading(false);
        }
    }
    _loadOutlineElement() {
        import('../../side-menu/side-menu');
    }
    urlChanged(e) {
        Debouncer.debounce(null, microTask, () => {
            if (e.detail.value !== '/') {
                this.$.resource.value = e.detail.value;
                if (!this.$.resource.invalid) {
                    this._setIsLoading(true);
                    this.loadResource(this.$.resource.value);
                }
            }
        });
    }
    loadOnEnter(e) {
        if (e.keyCode === 13) {
            this.load();
        }
    }
    _loadDocElements(e) {
        if (e.detail.value === true) {
            import('../../api-documentation/viewer/viewer');
        }
    }
    _focusUrlInput() {
        this.$.resource.focus();
    }
    howOperationForm(e) {
        if (e.detail.operation.requiresInput === false) {
            e.detail.operation.invoke();
        }
        else {
            this.prevState = this.state;
            this.state = 'operation';
        }
    }
    executeOperation() {
        alert('op');
    }
};
__decorate([
    computed('model')
], HfApp.prototype, "hasApiDocumentation", null);
__decorate([
    computed('*')
], HfApp.prototype, "urlInput", null);
__decorate([
    computed('currentModel')
], HfApp.prototype, "displayedModel", null);
__decorate([
    property({ type: Object })
], HfApp.prototype, "model", void 0);
__decorate([
    property({ type: String })
], HfApp.prototype, "url", void 0);
__decorate([
    property({ type: Object })
], HfApp.prototype, "currentModel", void 0);
__decorate([
    property({ type: Object, readOnly: true })
], HfApp.prototype, "lastError", void 0);
__decorate([
    property({ type: String, notify: true })
], HfApp.prototype, "state", void 0);
__decorate([
    property({ type: Boolean, readOnly: true, notify: true })
], HfApp.prototype, "isLoading", void 0);
__decorate([
    listen('show-class-documentation', document)
], HfApp.prototype, "showDocumentation", null);
__decorate([
    listen('show-inline-resource', document)
], HfApp.prototype, "showResource", null);
__decorate([
    listen('show-resource-json', document)
], HfApp.prototype, "showResourceJson", null);
HfApp = __decorate([
    customElement('hf-app')
], HfApp);
export default HfApp;
