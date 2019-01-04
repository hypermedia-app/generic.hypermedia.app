var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import fireNavigation from 'ld-navigation/fireNavigation';
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
let HypermediaApp = class HypermediaApp extends PolymerElement {
    constructor() {
        super();
        setPassiveTouchGestures(true);
    }
    connectedCallback() {
        super.connectedCallback();
        import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar');
        import('../entrypoint-selector');
        import('../../views');
    }
    navigate() {
        fireNavigation(this, this.address.url);
    }
    updateAddressBar(e) {
        this.address.url = e.detail.value;
    }
    static get template() {
        return html `
      <hydrofoil-paper-shell url="{{url}}" use-hash-urls>
        <app-toolbar slot="toolbar-left">
          <entrypoint-selector main-title on-url-changed="updateAddressBar">
            <span data-url="https://wikibus-test.gear.host/">Bus encyclopedia</span>
            <span data-url="http://www.markus-lanthaler.com/hydra/api-demo/">Hydra demo API</span>
          </entrypoint-selector>
        </app-toolbar>

        <app-toolbar slot="header">
          <hydrofoil-address-bar main-title url="[[url]]" on-resource-confirmed="navigate"></hydrofoil-address-bar>
        </app-toolbar>
      </hydrofoil-paper-shell>`;
    }
};
__decorate([
    property({ type: String })
], HypermediaApp.prototype, "url", void 0);
__decorate([
    query('hydrofoil-paper-shell')
], HypermediaApp.prototype, "shell", void 0);
__decorate([
    query('hydrofoil-address-bar')
], HypermediaApp.prototype, "address", void 0);
HypermediaApp = __decorate([
    customElement('hypermedia-app')
], HypermediaApp);
export default HypermediaApp;
