var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
let EntrypointSelector = class EntrypointSelector extends PolymerElement {
    ready() {
        super.ready();
        const apis = Array.prototype.map.call(this.children, (apiEl) => {
            return {
                label: apiEl.textContent,
                value: apiEl.getAttribute('data-url'),
            };
        });
        this._setProperty('apis', apis);
        if (apis.filter((api) => api.value === this.url)) {
            this.selector.value = this.url;
        }
    }
    _entrypointSelected(e) {
        if (e.detail.value) {
            this.url = e.detail.value;
        }
    }
    static get template() {
        return html `<vaadin-combo-box id="selector"
                                  label="Select Hydra API"
                                  items="[[apis]]"
                                  on-value-changed="_entrypointSelected"></vaadin-combo-box>`;
    }
};
__decorate([
    property({ type: String, notify: true })
], EntrypointSelector.prototype, "url", void 0);
__decorate([
    property({ type: Array, readOnly: true })
], EntrypointSelector.prototype, "apis", void 0);
__decorate([
    query('#selector')
], EntrypointSelector.prototype, "selector", void 0);
EntrypointSelector = __decorate([
    customElement('entrypoint-selector')
], EntrypointSelector);
export default EntrypointSelector;
