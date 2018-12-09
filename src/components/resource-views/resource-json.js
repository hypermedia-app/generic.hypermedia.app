var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, property } from '@polymer/decorators';
import '@polymer/paper-dialog/paper-dialog';
import { html, PolymerElement } from '@polymer/polymer';
// import 'bower:show-json/show-json.html'
import { decycle } from '../../lib/decycle';
let ResourceJson = class ResourceJson extends PolymerElement {
    get _decycledResource() {
        return decycle(this.resource);
    }
    show() {
        this.$.dialog.open();
    }
    static get template() {
        return html `<style>
paper-dialog {
  max-width: 90%;
  overflow: scroll;
  </style>

  <paper-dialog id="dialog" with-backdrop>
    <show-json json="[[_decycledResource]]" hide-copy-button></show-json>
</paper-dialog>`;
    }
};
__decorate([
    property({ type: Object })
], ResourceJson.prototype, "resource", void 0);
__decorate([
    computed('resource')
], ResourceJson.prototype, "_decycledResource", null);
ResourceJson = __decorate([
    customElement('resource-json')
], ResourceJson);
