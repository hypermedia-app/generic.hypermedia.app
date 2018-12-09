var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import 'bower:mat-elements/mat-list.html'
// import 'bower:mat-elements/mat-sublist.html'
import './entrypoint-menu';
import './resource-outline';
import { customElement, observe, property } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
let SideMenu = class SideMenu extends PolymerElement {
    _getEntrypoint(resource) {
        resource.apiDocumentation.loadEntrypoint()
            .then((entrypoint) => {
            this._setEntrypoint(entrypoint.root);
        })
            .catch(() => {
            this._setEntrypoint({});
        });
    }
    static get template() {
        return html ` <style>:host { display: block }</style>
<mat-list>
    <mat-sublist label="Main menu" collapsible>
        <entrypoint-menu entrypoint="[[entrypoint]]"></entrypoint-menu>
    </mat-sublist>
    <mat-sublist label="Resource outline" collapsible collapsed>
        <resource-outline root-resource="[[resource]]"></resource-outline>
    </mat-sublist>
</mat-list>`;
    }
};
__decorate([
    property({ type: Object })
], SideMenu.prototype, "resource", void 0);
__decorate([
    property({ type: Object, readOnly: true })
], SideMenu.prototype, "entrypoint", void 0);
__decorate([
    observe('resource')
], SideMenu.prototype, "_getEntrypoint", null);
SideMenu = __decorate([
    customElement('side-menu')
], SideMenu);
export default SideMenu;
