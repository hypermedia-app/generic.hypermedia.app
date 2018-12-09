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
import css from './style.pcss';
import template from './template.html';
import '@polymer/paper-input/paper-input';
import '@polymer/app-layout';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/av-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-styles/default-theme';
import '@polymer/paper-styles/typography';
import '@polymer/paper-styles/paper-styles';
// import './libs/Templates.js';
// import './libs/Utils.js';
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
    hasPreviousModel(_modelHistory) {
        return _modelHistory.base.length > 0;
    }
    connectedCallback() {
        super.connectedCallback();
        // Polymer.importHref('dist/entrypoint-selector.html');
    }
    showDocs() {
        this.$.documentation.open();
    }
    load() {
        this._setIsLoading(true);
        // LdNavigation.Helpers.fireNavigation(this, this.$.resource.value);
    }
    loadResource(value) {
        Polymer.importHref('dist/entrypoint-selector.html', async () => {
            try {
                const hr = await Hypermedia.Hydra.loadResource(value);
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
                console.error(err);
            }
        });
    }
    _loadOutlineElement() {
        // Polymer.importHref('dist/menus/side-menu.html');
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
    get displayedModel() {
        return this.currentModel.collection || this.currentModel;
    }
    showModel(ev) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }
    _loadDocElements(e) {
        if (e.detail.value === true) {
            // Polymer.importHref('dist/api-documentation/viewer.html');
        }
    }
    showDocumentation(e) {
        Polymer.importHref('dist/api-documentation/viewer.html', () => {
            this.$.apiDocumentation.selectClass(e.detail.classId);
            this.showDocs();
        });
        e.stopPropagation();
    }
    showResource(e) {
        this.currentModel = e.detail.resource;
    }
    showResourceJson(e) {
        Polymer.importHref('dist/resource-views/resource-json.html', () => {
            this.$.source.resource = e.detail.resource;
            this.$.source.show();
        });
    }
    _focusUrlInput() {
        this.$.resource.focus();
    }
    howOperationForm(e) {
        if (e.detail.operation.requiresInput === false) {
            e.detail.operation.invoke();
        }
        else {
            this._prevState = this.state;
            this.state = 'operation';
        }
    }
    hideOperationForm() {
        this.state = this._prevState || 'ready';
    }
    executeOperation() {
        alert('op');
    }
    static get template() {
        return html([`<style>${css}</style> ${template}`]);
    }
};
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
    property({ type: Boolean, readOnly: true })
], HfApp.prototype, "isLoading", void 0);
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
