var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, property, query } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import '@lit-any/lit-any/lit-form';
import '../../forms';
const decorator = {
    unwrap: (v) => {
        if (typeof v === 'object' && v !== null) {
            v = v['@value'];
        }
        return v || '';
    },
    wrap: (formValue) => {
        return {
            '@value': formValue,
        };
    },
};
let default_1 = class default_1 extends PolymerElement {
    get contract() {
        return {
            fields: this.template.mappings.map((f) => ({
                property: f.property.id,
                title: f.property.title || f.variable,
                type: f.property.range,
                valueDecorator: decorator,
            })),
        };
    }
    submit() {
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                url: this.template.expand(this.form.value)
            },
        }));
    }
    static get template() {
        return html `<lit-form no-labels contract="[[contract]]"
                          submit-button-label="Filter"
                          value="[[value]]"
                          on-submit="submit"></lit-form>`;
    }
};
__decorate([
    property({ type: Object })
], default_1.prototype, "template", void 0);
__decorate([
    property({ type: Object, notify: true })
], default_1.prototype, "value", void 0);
__decorate([
    computed('template')
], default_1.prototype, "contract", null);
__decorate([
    query('lit-form')
], default_1.prototype, "form", void 0);
default_1 = __decorate([
    customElement('url-template-form')
], default_1);
export default default_1;
