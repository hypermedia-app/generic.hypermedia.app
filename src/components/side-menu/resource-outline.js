var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/iron-icons/iron-icons';
// import 'bower:mat-elements/mat-avatar.html'
// import 'bower:mat-elements/mat-divider.html'
// import 'bower:mat-elements/mat-item.html'
// import 'bower:mat-elements/mat-list.html'
// import 'bower:mat-elements/mat-sublist.html'
import '@polymer/paper-icon-button/paper-icon-button';
import '../api-documentation/property-label';
import { computed, customElement, observe, property } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import template from './resource-outline.html';
let ResourceOutline = class ResourceOutline extends PolymerElement {
    constructor() {
        super(...arguments);
        this.history = [];
        this.hasHistory = false;
    }
    get resourceId() {
        return this.resource['@id'];
    }
    get currentProperties() {
        const enumerableProperties = Object.entries(this.resource)
            .filter((entry) => entry[1]['@id'] || Array.isArray(entry[1]))
            .map((entry) => {
            const id = Array.isArray(entry[1])
                ? 'Multiple items'
                : entry[1]['@id'];
            return {
                id,
                property: entry[0],
            };
        });
        return [...enumerableProperties];
    }
    _getPath(uri) {
        try {
            const url = new URL(uri);
            return url.pathname + url.search;
        }
        catch (e) {
            return uri;
        }
    }
    _rootChanged(rootResource) {
        this._setProperty('resource', rootResource);
    }
    _changeResource(e) {
        const property = e.target.data;
        this.history.push(this.resource);
        this._setProperty('resource', this.resource[property]);
        this._setProperty('hasHistory', true);
    }
    _goUp() {
        const previous = this.history.pop();
        if (previous) {
            this._setProperty('resource', previous);
        }
        this._setProperty('hasHistory', this.history.length > 0);
    }
    _showSource() {
        this.dispatchEvent(new CustomEvent('show-resource-json', {
            bubbles: true,
            composed: true,
            detail: {
                resource: this.resource,
            },
        }));
    }
    static get template() {
        return html([`${template}`]);
    }
};
__decorate([
    property({ type: Object })
], ResourceOutline.prototype, "rootResource", void 0);
__decorate([
    property({ type: Object, readOnly: true })
], ResourceOutline.prototype, "resource", void 0);
__decorate([
    property({ type: Array, readOnly: true })
], ResourceOutline.prototype, "history", void 0);
__decorate([
    computed('resource')
], ResourceOutline.prototype, "resourceId", null);
__decorate([
    property({ type: Boolean })
], ResourceOutline.prototype, "hasHistory", void 0);
__decorate([
    computed('resource')
], ResourceOutline.prototype, "currentProperties", null);
__decorate([
    observe()
], ResourceOutline.prototype, "_rootChanged", null);
ResourceOutline = __decorate([
    customElement('resource-outline')
], ResourceOutline);
export { ResourceOutline };
