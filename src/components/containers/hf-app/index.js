var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import HydrofoilShell from '@hydrofoil/hydrofoil-shell';
import { customElement, observe } from '@polymer/decorators';
let HfApp = class HfApp extends HydrofoilShell {
    connectedCallback() {
        super.connectedCallback();
        import('../../entrypoint-selector');
    }
    async onLoaded(isLoading) {
        if (isLoading) {
            await import('../../../views');
        }
    }
};
__decorate([
    observe('isLoading')
], HfApp.prototype, "onLoaded", null);
HfApp = __decorate([
    customElement('hf-app')
], HfApp);
export default HfApp;
