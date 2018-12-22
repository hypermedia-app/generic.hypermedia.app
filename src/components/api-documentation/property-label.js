var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, observe, property } from '@polymer/decorators';
import '@polymer/paper-tooltip/paper-tooltip';
import { html, PolymerElement } from '@polymer/polymer';
import * as flatten from 'lodash/flatten';
let PropertyLabel = class PropertyLabel extends PolymerElement {
    _getPropertyTitle(supportedProperty, propertyId) {
        if (supportedProperty && supportedProperty.title) {
            return supportedProperty.title;
        }
        return propertyId;
    }
    getTitle(resource, propertyId) {
        if (resource && resource.apiDocumentation) {
            const properties = resource.types.map((t) => resource.apiDocumentation.getProperties(t));
            const supportedProps = flatten(properties);
            const [supportedProp, ...tail] = supportedProps.filter((prop) => prop.property.id === propertyId);
            if (supportedProp) {
                this._setProperty('supportedProperty', supportedProp);
                return;
            }
        }
        this._setProperty('supportedProperty', propertyId);
    }
    static get template() {
        return html `<span id="title">[[propertyTitle]]</span>
<paper-tooltip for="title" position="right">
    [[propertyId]]
    <br><br>
    [[supportedProperty.description]]
</paper-tooltip>`;
    }
};
__decorate([
    property({ computed: '_getPropertyTitle(supportedProperty, propertyId)', type: String, notify: true })
], PropertyLabel.prototype, "propertyTitle", void 0);
__decorate([
    observe('resource', 'propertyId')
], PropertyLabel.prototype, "getTitle", null);
PropertyLabel = __decorate([
    customElement('property-label')
], PropertyLabel);
