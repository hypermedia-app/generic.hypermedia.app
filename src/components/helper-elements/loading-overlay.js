// import 'bower:mat-elements/mat-spinner.html'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from '@polymer/decorators';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
let LoadingOverlay = class LoadingOverlay extends mixinBehaviors(IronOverlayBehavior, PolymerElement) {
    constructor() {
        super(...arguments);
        this.withBackdrop = true;
        this.noCancelOnOutsideClick = true;
        this.alwaysOnTop = true;
        this.noCancelOnEscKey = true;
        this.autoFitOnAttach = true;
    }
    static get template() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Boolean, readOnly: true })
], LoadingOverlay.prototype, "withBackdrop", void 0);
__decorate([
    property({ type: Boolean, readOnly: true })
], LoadingOverlay.prototype, "noCancelOnOutsideClick", void 0);
__decorate([
    property({ type: Boolean, readOnly: true })
], LoadingOverlay.prototype, "alwaysOnTop", void 0);
__decorate([
    property({ type: Boolean, readOnly: true })
], LoadingOverlay.prototype, "noCancelOnEscKey", void 0);
__decorate([
    property({ type: Boolean, readOnly: true })
], LoadingOverlay.prototype, "autoFitOnAttach", void 0);
LoadingOverlay = __decorate([
    customElement('loding-overlay')
], LoadingOverlay);
export default LoadingOverlay;
