var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import 'bower:mat-elements/mat-list.html'
import { computed, customElement } from '@polymer/decorators/lib/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat';
import { Helpers } from 'LdNavigation/ld-navigation';
let EntrypointMenu = class EntrypointMenu extends PolymerElement {
    get links() {
        return this.entrypoint.apiDocumentation
            .getProperties(this.entrypoint.types[0])
            .filter((sp) => {
            return sp.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1;
        });
    }
    load(e) {
        Helpers.fireNavigation(this, this.entrypoint[e.model.link.property.id].id);
    }
    static get template() {
        return html `<mat-list>
    <dom-repeat items="[[links]]" as="link">
    <template>
    <mat-item label="[[link.title]]" on-xp-activate="load">[[link.title]]</mat-item>
    </template>
</dom-repeat>
</mat-list>`;
    }
};
__decorate([
    computed('entrypoint')
], EntrypointMenu.prototype, "links", null);
EntrypointMenu = __decorate([
    customElement('entrypoint-menu')
], EntrypointMenu);
