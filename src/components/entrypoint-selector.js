var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/polymer/lib/elements/dom-repeat';
let EntrypointSelector = class EntrypointSelector extends PolymerElement {
    connectedCallback() {
        super.connectedCallback();
        const apis = Array.prototype.map.call(this.querySelectorAll('span'), (apiEl) => {
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
            this.url = e.detail.value.dataUrl;
        }
    }
    static get template() {
        return html `
<style>
  :host {
    display: flex;
    pointer-events: all !important;

    --paper-dropdown-menu: {
      flex-grow: 1;
      top: -10px;
    };

    --paper-input-container-color: white;
    --paper-input-container-input-color: white;
    --paper-dropdown-menu-icon: {
      color: white;
    };
  }

  ::slotted(paper-item) {
    display: auto;
  }
  </style>
<paper-dropdown-menu id="selector" label="Select Hydra API">
  <paper-listbox slot="dropdown-content" on-selected-item-changed="_entrypointSelected">
    <dom-repeat items="[[apis]]" as="api">
      <template>
        <paper-item data-url="[[api.value]]">[[api.label]]</paper-item>
      </template>
    </dom-repeat>
  </paper-listbox>
</paper-dropdown-menu>`;
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
