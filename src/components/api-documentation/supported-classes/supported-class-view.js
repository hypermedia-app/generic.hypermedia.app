var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, observe, property } from '@polymer/decorators';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-tabs/paper-tabs';
import { html, PolymerElement } from '@polymer/polymer';
// import '../supported-operations/supported-operations-viewer'
// import '../supported-properties/supported-property-view'
import template from './supported-class-view.html';
import style from './supported-class-view.pcss';
let SupportedClassView = class SupportedClassView extends PolymerElement {
    get propertyIsSelected() {
        return typeof this.selectedProperty !== 'undefined' && this.selectedProperty !== null;
    }
    get hasProperties() {
        if (!this.supportedClass) {
            return false;
        }
        return this.supportedClass.supportedProperties.length > 0;
    }
    get hasOperations() {
        if (!this.supportedClass) {
            return false;
        }
        return this.supportedClass.supportedOperations.length > 0;
    }
    static get template() {
        return html([`<style>${style}</style> ${template}`]);
    }
    connectedCallback() {
        super.connectedCallback();
        this.$.classTabs.select(0);
    }
    openProperties() {
        this.$.props.toggle();
    }
    getProperties(supportedClass) {
        this.$.supportedProperties.value = null;
        this.$.classTabs.selected = 0;
    }
};
__decorate([
    computed('selectedProperty')
], SupportedClassView.prototype, "propertyIsSelected", null);
__decorate([
    computed('supportedClass')
], SupportedClassView.prototype, "hasProperties", null);
__decorate([
    computed('supportedClass')
], SupportedClassView.prototype, "hasOperations", null);
__decorate([
    property({ type: Object })
], SupportedClassView.prototype, "supportedClass", void 0);
__decorate([
    property({ type: Object })
], SupportedClassView.prototype, "selectedProperty", void 0);
__decorate([
    observe('supportedClass')
], SupportedClassView.prototype, "getProperties", null);
SupportedClassView = __decorate([
    customElement('supported-class-view')
], SupportedClassView);
export { SupportedClassView };
